from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend
import matplotlib.pyplot as plt



app = Flask(__name__)
app.debug = True
CORS(app)  # Enable CORS for the Flask app


@app.route('/predict', methods=['POST'])
def predict():
    # Check if a JSON body was posted
    if not request.is_json:
        return jsonify({'error': 'Missing JSON in request'}), 400

    data = request.get_json()

    # Convert the JSON body into a DataFrame
    df = pd.DataFrame(data)

    # Preprocess the data
    df = df.melt(id_vars='barangay', var_name='Year', value_name='Incidents')
    df['Year'] = pd.to_datetime(df['Year'], format='%Y')
    df.set_index(['barangay', 'Year'], inplace=True)


    
    # Train the model and predict for each barangay
    predictions = {}
    for barangay in df.index.get_level_values('barangay').unique():
        model = ARIMA(df.loc[barangay], order=(5,1,0))
        model_fit = model.fit()
        prediction_2024 = model_fit.predict(start=pd.to_datetime('2024-01-01'), end=pd.to_datetime('2024-12-31'), typ='levels')
        predictions[barangay] = max(0, round(prediction_2024[0]))

   # Plot the predictions
    plt.figure(figsize=(5, 6))
    plt.bar(predictions.keys(), predictions.values())
    plt.xlabel('Barangay')
    plt.ylabel('Predicted Fire Incidents in 2024')
    plt.title('Predicted Fire Incidents in 2024 for Each Barangay')
    plt.xticks(rotation=90)  # Rotate the x-axis labels for better readability
    plt.savefig('predictions.png')  # Save the plot as an image file

    return jsonify({'predictions': predictions})

if __name__ == '__main__':
    app.run(debug=True)