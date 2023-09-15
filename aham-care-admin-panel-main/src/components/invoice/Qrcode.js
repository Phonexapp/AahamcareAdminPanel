import QRCode from 'react-qr-code';

function Qrcode({ invoiceData }) {
  console.log("in->",invoiceData);
 
  return <QRCode value={invoiceData} size={100} />;
}

export default Qrcode;
