import pdf from 'pdfjs';

onmessage = function (e) {
  const doc = new pdf.Document();
  const file1 = e.data.file1;
  const file2 = e.data.file2;
  const file1Doc = new pdf.ExternalDocument(file1);
  const file2Doc = new pdf.ExternalDocument(file2);
  doc.addPagesOf(file1Doc);
  doc.addPagesOf(file2Doc);
  doc.asBuffer().then((buffer) => postMessage(buffer));
};
