import html2canvas from 'html2canvas';

export const capture = (id, name) => {
  console.log('capturing', id);
  const node = document.getElementById(id);

    html2canvas(node,{
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // Create new link Element
      const link = document.createElement('a');
      // Set the href and download attributes of the link
      link.href = imgData;
      link.download = name+'.png';
      // Append the link to the body
      document.body.appendChild(link);
      // Click the link to start the download
      link.click();
      // Clean up by removing the link
      document.body.removeChild(link);
    });

      //  html2canvas(node, {
      //   useCORS: true,
      //   onrendered: function(canvas) {
      //     var link = document.createElement('a');
      //     link.href = canvas.toDataURL('image/png');
      //     link.download = 'heatmap.png';
      //     link.click();
      //   }
      // });
}