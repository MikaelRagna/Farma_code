import React from "react";
import jsPDF from "jspdf";
import Logo from "../../../../assets/logoReceita.png";


function GeraPdf(receit) {
  let receita = receit;

  // Crie um objeto jsPDF
  let doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  // Defina o título da receita
  doc
    .setFont("Helvetica", "normal")
     .setFontSize(20)
     .text("Receita Médica", 77, 30);

  // Adiciona uma imagem ao documento
  doc.addImage(`${Logo}`, "PNG", 10, 10, 25, 10);

  //Define as informaçoes do paciente
  doc.setFontSize(18).text(`Identificação do paciente`, 10, 60);
   doc
     .setFontSize(14)
     .setTextColor(0, 0, 0, 0.58)
     .text(`Nome completo: ${receita.nome_paciente}`, 10, 70);
   doc
     .setFontSize(14)
     .setTextColor(0, 0, 0, 0.58)
     .text(`Data validade: ${receita.validade}`, 10, 80);

  // Defina as informações do medicamento
  let i = 0;

  for(i; i < receita.lista_de_medicamentos.length; i++) {
    doc
       .setFontSize(14)
       .setTextColor(0, 0, 0)
       .text(`${receita.lista_de_medicamentos[i].remedio.nome}`, 13, 130 + i * 26)
       .setFontSize(13)
       .setTextColor(97, 96, 96)
       .text(`${receita.lista_de_medicamentos[i].prescricao}`, 13, 140 + i * 26)
       .rect(8, 120 + i * 26 , 196, 24, 'D' );
  }

  doc
  .setTextColor(0,0,0)
  .setFontSize(16)
  .text('Encontre seus remédios nas lojas Farma Code', 12, receita.lista_de_medicamentos.length > 3 ? 150 + i *20 : 210)

  doc
  .setTextColor(41, 41, 41)
  .setFontSize(12)
  .text('Compre online pelos serviços da receita Farme Code ou retire facilmente em nossas lojas ', 12, receita.lista_de_medicamentos.length > 3 ? 160 + i *20 : 220)

  
  const modelSecret = receita.hash
  const Link = window.location.href
  const qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodeURIComponent(Link)}`

  receita.lista_de_medicamentos.length > 3 ? doc.addPage() : null
  doc
  .setTextColor(41, 41, 41)
  .setFontSize(12)
  .text('Escaneie o qr code ou  copie e cole o código abaixo:', 12, receita.lista_de_medicamentos.length > 3 ? 240 + i *20 : 240)
  doc
  .setTextColor(41, 41, 41)
  .setFontSize(8)
  .text(`${modelSecret}`, 63, receita.lista_de_medicamentos.length > 3 ? 50 : 287)
  doc.addImage(`${qrCode}`, "PNG", 7,receita.lista_de_medicamentos.length > 3 ? 10  : 245, 50, 50)
  
  

  // Salve o PDF
  doc.save(`${receita.nome_paciente}.pdf`);
}


export default GeraPdf;
