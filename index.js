import { saveAs } from 'file-saver';

const worker = new Worker(new URL('./worker.js', import.meta.url));

worker.onmessage = function (e) {
  const buffer = e.data;
  const blob = new Blob([buffer]);
  saveAs(blob, 'merged.pdf');
};

const filesubmit = document.getElementById('filesubmit');
filesubmit.addEventListener('click', () => {
  const file1 = document.getElementById('file1').files[0];
  const file2 = document.getElementById('file2').files[0];

  Promise.all([file1.arrayBuffer(), file2.arrayBuffer()]).then((buffers) => {
    const data = {
      file1: buffers[0],
      file2: buffers[1]
    }
    worker.postMessage(data, [data.file1, data.file2]);
  });
});
