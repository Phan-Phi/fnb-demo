import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  data: string;
}

export default function PDFItem({ data }: Props) {
  // const url = data.replace("http", "https");
  return (
    <Document file={data}>
      <Page pageNumber={1} />
    </Document>
  );
}
