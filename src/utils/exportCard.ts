import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { CoffeeCardItem, ViewMode } from '../types';

const commonExportOptions = {
  quality: 0.95,
  pixelRatio: 2,
  backgroundColor: '#ffffff',
  skipFonts: true, // Prevents cross-origin CSSStyleSheet.cssRules access errors from remote web fonts
  filter: (domNode: HTMLElement) => {
    // Exclude action buttons, menus, and no-print elements from the exported card image
    if (domNode.classList && domNode.classList.contains('no-print')) {
      return false;
    }
    return true;
  },
};

export async function exportCardAsImage(
  elementId: string,
  fileName: string,
  format: 'png' | 'jpeg' = 'png'
): Promise<boolean> {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    const dataUrl =
      format === 'png'
        ? await toPng(node, commonExportOptions)
        : await toJpeg(node, commonExportOptions);

    const link = document.createElement('a');
    link.download = `${fileName.replace(/\s+/g, '_')}.${format}`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export card as image:', error);
    return false;
  }
}

/**
 * Generates a 100% native vector & selectable text PDF for the coffee card.
 * All text can be highlighted, copied, searched, and scales crisply without rasterization.
 */
export async function exportCardAsPDF(
  elementId: string,
  fileName: string,
  coffee?: CoffeeCardItem,
  mode: ViewMode = 'enthusiast'
): Promise<boolean> {
  // If we have the structured coffee data, generate a true native vector PDF!
  if (coffee) {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;

      // Color Palette (RGB)
      const cDarkEspresso = [43, 19, 7]; // #2b1307
      const cDeepAmber = [120, 53, 15]; // #78350f
      const cWarmGold = [217, 119, 6]; // #d97706
      const cLightAmberBg = [254, 243, 199]; // #fef3c7
      const cStoneDark = [28, 25, 23]; // #1c1917
      const cStoneMuted = [120, 113, 108]; // #78716c
      const cStoneBorder = [231, 229, 228]; // #e7e5e4
      const cCardBg = [255, 253, 250]; // #fffdfa
      const cWhite = [255, 255, 255];
      const cGreen = [22, 101, 52];

      // Draw Main Card Container (Vector with subtle drop-shadow effect & border)
      const cardY = 16;
      const cardHeight = 262;

      // Card Background
      pdf.setFillColor(cCardBg[0], cCardBg[1], cCardBg[2]);
      pdf.setDrawColor(cStoneBorder[0], cStoneBorder[1], cStoneBorder[2]);
      pdf.setLineWidth(0.6);
      pdf.roundedRect(margin, cardY, contentWidth, cardHeight, 6, 6, 'FD');

      // Top Official Header Banner (KTP Kopi Republic Banner)
      const headerHeight = 24;
      pdf.setFillColor(cDarkEspresso[0], cDarkEspresso[1], cDarkEspresso[2]);
      pdf.roundedRect(margin, cardY, contentWidth, headerHeight, 6, 6, 'F');
      // Fill bottom corners of header so it seamlessly attaches to the card body
      pdf.rect(margin, cardY + headerHeight - 4, contentWidth, 4, 'F');

      // Header Golden Line Accent
      pdf.setDrawColor(cWarmGold[0], cWarmGold[1], cWarmGold[2]);
      pdf.setLineWidth(0.8);
      pdf.line(margin, cardY + headerHeight, margin + contentWidth, cardY + headerHeight);

      // Header Text: "REPUBLIK KOPI INDONESIA" & "KARTU TANDA PENGENAL KOPI (COFFEE ID)"
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10.5);
      pdf.setTextColor(245, 158, 11); // Amber Gold
      pdf.text('REPUBLIK KOPI INDONESIA', margin + 18, cardY + 9);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(253, 230, 138); // Pale Gold
      pdf.text('KARTU TANDA PENGENAL KOPI (COFFEE ID CARD)', margin + 18, cardY + 14.5);

      // Emblem Cup Icon (Vector)
      pdf.setFillColor(cWarmGold[0], cWarmGold[1], cWarmGold[2]);
      pdf.circle(margin + 9, cardY + 11.5, 4.5, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.5);
      pdf.setTextColor(cDarkEspresso[0], cDarkEspresso[1], cDarkEspresso[2]);
      pdf.text('KTP', margin + 6.3, cardY + 12.8);

      // KTP Number (Top Right)
      pdf.setFont('courier', 'bold');
      pdf.setFontSize(8.5);
      pdf.setTextColor(cWhite[0], cWhite[1], cWhite[2]);
      pdf.text(`NO. ${coffee.ktpNumber || 'ID-KOPI-001'}`, margin + contentWidth - 6, cardY + 11, {
        align: 'right',
      });
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(253, 230, 138);
      pdf.text(
        mode === 'casual'
          ? 'EDISI: CASUAL (ORANG BIASA)'
          : mode === 'beginner'
          ? 'EDISI: BEGINNER (PENIKMAT PEMULA)'
          : 'EDISI: SPECIALTY ENTHUSIAST',
        margin + contentWidth - 6,
        cardY + 16,
        { align: 'right' }
      );

      // Current Y pointer inside card
      let y = cardY + headerHeight + 8;

      // Species & Origin Country Tag
      pdf.setFillColor(cLightAmberBg[0], cLightAmberBg[1], cLightAmberBg[2]);
      pdf.setDrawColor(cWarmGold[0], cWarmGold[1], cWarmGold[2]);
      pdf.setLineWidth(0.3);
      const tagText = `${coffee.type.toUpperCase()} • ${coffee.originCountry.toUpperCase()}`;
      const tagWidth = pdf.getTextWidth(tagText) + 8;
      pdf.roundedRect(margin + 8, y - 4, tagWidth, 6, 1.5, 1.5, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(cDeepAmber[0], cDeepAmber[1], cDeepAmber[2]);
      pdf.text(tagText, margin + 12, y);

      // Star Rating on Top Right
      const ratingStarsText = '★'.repeat(coffee.rating) + '☆'.repeat(5 - coffee.rating);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(cWarmGold[0], cWarmGold[1], cWarmGold[2]);
      pdf.text(ratingStarsText, margin + contentWidth - 8, y, { align: 'right' });

      y += 8;

      // Coffee Name (Large Bold Title)
      pdf.setFont('times', 'bold');
      pdf.setFontSize(19);
      pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
      pdf.text(coffee.name, margin + 8, y);

      // SCA Score Badge (Vector Seal at Top Right if available)
      if (coffee.scaScore && mode !== 'casual') {
        const badgeX = margin + contentWidth - 28;
        const badgeY = y - 6;
        pdf.setFillColor(255, 251, 235); // Light Gold Fill
        pdf.setDrawColor(cWarmGold[0], cWarmGold[1], cWarmGold[2]);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(badgeX, badgeY, 20, 16, 2, 2, 'FD');

        pdf.setFont('courier', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(cDarkEspresso[0], cDarkEspresso[1], cDarkEspresso[2]);
        pdf.text(coffee.scaScore.toFixed(2), badgeX + 10, badgeY + 6.5, { align: 'center' });

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(5.5);
        pdf.setTextColor(cDeepAmber[0], cDeepAmber[1], cDeepAmber[2]);
        pdf.text('SCA CUP SCORE', badgeX + 10, badgeY + 11, { align: 'center' });
        pdf.text('GRADE 1 SPECIALTY', badgeX + 10, badgeY + 14, { align: 'center' });
      }

      y += 6;

      // Region & Terroir Subtitle
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
      pdf.text(`Wilayah: ${coffee.region}, ${coffee.originCountry}`, margin + 8, y);

      y += 8;

      // Divider Line
      pdf.setDrawColor(cStoneBorder[0], cStoneBorder[1], cStoneBorder[2]);
      pdf.setLineWidth(0.4);
      pdf.line(margin + 8, y, margin + contentWidth - 8, y);

      y += 6;

      // SECTION 1: CASUAL / TASTING SUMMARY QUOTE BOX
      const summaryBoxY = y;
      const summaryBoxHeight = 18;
      pdf.setFillColor(254, 248, 240); // Soft Cream
      pdf.setDrawColor(246, 224, 194);
      pdf.roundedRect(margin + 8, summaryBoxY, contentWidth - 16, summaryBoxHeight, 3, 3, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(cDeepAmber[0], cDeepAmber[1], cDeepAmber[2]);
      pdf.text('KESAN RASA UTAMA (FLAVOUR SUMMARY):', margin + 12, summaryBoxY + 5.5);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
      const summaryText = `"${coffee.casualDescription || coffee.generalCharacter}"`;
      const splitSummary = pdf.splitTextToSize(summaryText, contentWidth - 24);
      pdf.text(splitSummary, margin + 12, summaryBoxY + 11);

      y = summaryBoxY + summaryBoxHeight + 6;

      // SECTION 2: SPECIFICATION TABLE (Vector Table)
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
      pdf.text('IDENTITAS LENGKAP BIJI KOPI (COFFEE SPECIFICATIONS)', margin + 8, y);

      y += 3;

      const tableX = margin + 8;
      const tableWidth = contentWidth - 16;
      const rowHeight = 7.5;
      const col1Width = tableWidth * 0.5;

      const specs = [
        [
          { label: 'Spesies / Jenis', val: coffee.type },
          { label: 'Metode Proses', val: coffee.process },
        ],
        [
          { label: 'Ketinggian (Altitude)', val: coffee.altitudeRange },
          { label: 'Tingkat Sangrai', val: `${coffee.roastLevel} Roast` },
        ],
        [
          { label: 'Kultivar / Varietal', val: coffee.varietal || 'Typica / Heirloom' },
          { label: 'Petani / Produser', val: coffee.producer || 'Petani Lokal' },
        ],
        [
          { label: 'Roaster / Crop', val: `${coffee.roaster || 'Specialty Roastery'} ${coffee.harvestYear ? `(${coffee.harvestYear})` : ''}` },
          { label: 'Saran Minum Terbaik', val: coffee.bestWayToDrink || 'Seduh Segar Panas / Es' },
        ],
      ];

      const tableHeight = specs.length * rowHeight;
      pdf.setFillColor(250, 250, 249);
      pdf.setDrawColor(cStoneBorder[0], cStoneBorder[1], cStoneBorder[2]);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(tableX, y, tableWidth, tableHeight, 2, 2, 'FD');

      // Draw horizontal & vertical dividers
      pdf.line(tableX + col1Width, y, tableX + col1Width, y + tableHeight);
      for (let i = 1; i < specs.length; i++) {
        pdf.line(tableX, y + i * rowHeight, tableX + tableWidth, y + i * rowHeight);
      }

      // Populate Table Cells
      specs.forEach((row, rIdx) => {
        const rowY = y + rIdx * rowHeight;

        // Cell 1
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(6.5);
        pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
        pdf.text(row[0].label.toUpperCase(), tableX + 3, rowY + 3.2);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
        pdf.text(String(row[0].val), tableX + 3, rowY + 6.2);

        // Cell 2
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(6.5);
        pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
        pdf.text(row[1].label.toUpperCase(), tableX + col1Width + 3, rowY + 3.2);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
        pdf.text(String(row[1].val), tableX + col1Width + 3, rowY + 6.2);
      });

      y += tableHeight + 6;

      // SECTION 3: FLAVOUR NOTES (Vector Pills)
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
      pdf.text('PROFIL RASA & AROMA (FLAVOUR WHEEL NOTES):', margin + 8, y);

      y += 3.5;

      let pillX = margin + 8;
      const pillHeight = 6.5;

      coffee.flavourNotes.forEach((note) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        const textWidth = pdf.getTextWidth(note);
        const pillWidth = textWidth + 8;

        if (pillX + pillWidth > margin + contentWidth - 8) {
          pillX = margin + 8;
          y += pillHeight + 2;
        }

        // Pill background
        pdf.setFillColor(cDarkEspresso[0], cDarkEspresso[1], cDarkEspresso[2]);
        pdf.roundedRect(pillX, y, pillWidth, pillHeight, 1.5, 1.5, 'F');

        // Pill text
        pdf.setTextColor(cLightAmberBg[0], cLightAmberBg[1], cLightAmberBg[2]);
        pdf.text(note, pillX + 4, y + 4.5);

        pillX += pillWidth + 3;
      });

      y += pillHeight + 7;

      // SECTION 4: SENSORY BALANCE BARS (Acidity, Body, Sweetness)
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
      pdf.text('SKALA KESEIMBANGAN SENSORI (SENSORY SPECTRUM):', margin + 8, y);

      y += 4;

      const sensoryItems = [
        { label: 'Keasaman (Acidity)', val: coffee.acidity, color: [234, 88, 12] }, // Orange
        { label: 'Ketebalan (Body)', val: coffee.body, color: [120, 53, 15] }, // Amber
        { label: 'Rasa Manis (Sweetness)', val: coffee.sweetness, color: [22, 101, 52] }, // Emerald
      ];

      const barWidth = (contentWidth - 16 - 8) / 3;

      sensoryItems.forEach((item, idx) => {
        const itemX = margin + 8 + idx * (barWidth + 4);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7);
        pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
        pdf.text(item.label, itemX, y);

        pdf.setFont('courier', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
        pdf.text(`${item.val}/5`, itemX + barWidth, y, { align: 'right' });

        // 5 blocks for level
        const blockGap = 1.2;
        const blockW = (barWidth - blockGap * 4) / 5;
        const blockY = y + 2;

        for (let b = 1; b <= 5; b++) {
          const bx = itemX + (b - 1) * (blockW + blockGap);
          if (b <= item.val) {
            pdf.setFillColor(item.color[0], item.color[1], item.color[2]);
          } else {
            pdf.setFillColor(229, 231, 235); // Light Gray
          }
          pdf.roundedRect(bx, blockY, blockW, 3, 0.8, 0.8, 'F');
        }
      });

      y += 12;

      // SECTION 5: BARISTA DIAL-IN BREWING RECIPE
      if (coffee.brewRecipe || (coffee.recommendedBrew && coffee.recommendedBrew.length > 0)) {
        const recipeBoxY = y;
        const recipeHeight = 25;

        pdf.setFillColor(248, 250, 252);
        pdf.setDrawColor(226, 232, 240);
        pdf.roundedRect(margin + 8, recipeBoxY, contentWidth - 16, recipeHeight, 2.5, 2.5, 'FD');

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(cDarkEspresso[0], cDarkEspresso[1], cDarkEspresso[2]);
        pdf.text(
          `PANDUAN SEDUH BARISTA (${coffee.recommendedBrew?.join(', ') || 'V60 / Filter'})`,
          margin + 12,
          recipeBoxY + 5.5
        );

        // Recipe items
        const colW = (contentWidth - 24) / 4;
        const recipeData = [
          { l: 'RASIO SEDUH', v: coffee.brewRecipe?.ratio || '1:15' },
          { l: 'SUHU AIR', v: coffee.brewRecipe?.temperature || '92°C' },
          { l: 'UKURAN GILING', v: coffee.brewRecipe?.grindSize || 'Medium-Fine' },
          { l: 'TARGET WAKTU', v: coffee.brewRecipe?.time || '2m 30s' },
        ];

        recipeData.forEach((r, idx) => {
          const rx = margin + 12 + idx * colW;
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(6);
          pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
          pdf.text(r.l, rx, recipeBoxY + 11);

          pdf.setFont('courier', 'bold');
          pdf.setFontSize(7.5);
          pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
          pdf.text(r.v, rx, recipeBoxY + 16);
        });

        if (coffee.brewRecipe?.note) {
          pdf.setFont('helvetica', 'italic');
          pdf.setFontSize(7);
          pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
          pdf.text(`Catatan: ${coffee.brewRecipe.note}`, margin + 12, recipeBoxY + 21.5);
        }

        y = recipeBoxY + recipeHeight + 6;
      }

      // SECTION 6: USER PERSONAL TASTING NOTES (If present)
      if (coffee.userNotes) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(cDeepAmber[0], cDeepAmber[1], cDeepAmber[2]);
        pdf.text('CATATAN PRIBADI (USER LOG):', margin + 8, y);
        y += 4;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.5);
        pdf.setTextColor(cStoneDark[0], cStoneDark[1], cStoneDark[2]);
        const splitNotes = pdf.splitTextToSize(coffee.userNotes, contentWidth - 16);
        pdf.text(splitNotes, margin + 8, y);
        y += splitNotes.length * 3.5 + 4;
      }

      // BOTTOM OFFICIAL VERIFICATION & SECURITY FOOTER
      const footerY = cardY + cardHeight - 16;
      pdf.setDrawColor(cStoneBorder[0], cStoneBorder[1], cStoneBorder[2]);
      pdf.setLineWidth(0.4);
      pdf.line(margin + 8, footerY, margin + contentWidth - 8, footerY);

      // Official Stamp Text
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(cGreen[0], cGreen[1], cGreen[2]);
      pdf.text('✓ VERIFIED SPECIALTY IDENTITY • REPUBLIK KOPI INDONESIA', margin + 8, footerY + 6);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
      const dateStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      pdf.text(`Dokumen Asli Coffee ID • Diterbitkan: ${dateStr}`, margin + 8, footerY + 10.5);

      // Vector Security Barcode at Bottom Right
      const barcodeX = margin + contentWidth - 36;
      const barcodeY = footerY + 3;
      pdf.setFillColor(cDarkEspresso[0], cDarkEspresso[1], cDarkEspresso[2]);
      const barPattern = [1.2, 0.4, 0.8, 1.5, 0.5, 1.0, 0.4, 1.4, 0.6, 1.1, 0.5, 1.3, 0.4, 1.6];
      let curBx = barcodeX;
      barPattern.forEach((w, i) => {
        if (i % 2 === 0) {
          pdf.rect(curBx, barcodeY, w, 7, 'F');
        }
        curBx += w + 0.6;
      });

      pdf.setFont('courier', 'normal');
      pdf.setFontSize(5.5);
      pdf.setTextColor(cStoneMuted[0], cStoneMuted[1], cStoneMuted[2]);
      pdf.text(coffee.ktpNumber, barcodeX + 13, barcodeY + 9.5, { align: 'center' });

      // Save the vector PDF file
      pdf.save(`${fileName.replace(/\s+/g, '_')}_KTP_Kopi.pdf`);
      return true;
    } catch (vectorError) {
      console.error('Vector PDF generation failed, falling back to html snapshot:', vectorError);
    }
  }

  // Fallback if no coffee item is provided
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    const dataUrl = await toPng(node, commonExportOptions);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

    // Header label
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(69, 26, 3);
    pdf.text('COFFEE ID — KARTU IDENTITAS KOPI', margin, 18);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(120, 113, 108);
    pdf.text(`Diekspor pada: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}`, margin, 24);

    pdf.addImage(dataUrl, 'PNG', margin, 28, contentWidth, contentHeight);

    pdf.save(`${fileName.replace(/\s+/g, '_')}_KTP_Kopi.pdf`);
    return true;
  } catch (error) {
    console.error('Failed to export card as PDF fallback:', error);
    return false;
  }
}

/**
 * Generates and downloads a clean, beautifully formatted plain-text (.txt) file
 * containing the full Coffee ID / KTP Kopi passport specifications and brew guide.
 */
export function exportCardAsTXT(
  fileName: string,
  coffee: CoffeeCardItem,
  mode: ViewMode = 'enthusiast'
): boolean {
  try {
    const starString = '★'.repeat(coffee.rating) + '☆'.repeat(5 - coffee.rating);
    const modeName =
      mode === 'casual'
        ? 'CASUAL (ORANG BIASA)'
        : mode === 'beginner'
        ? 'BEGINNER (PENIKMAT PEMULA)'
        : 'ENTHUSIAST (SPESIALIS KOPI)';

    const sensoryBar = (val: number) => '■'.repeat(val) + '□'.repeat(5 - val);

    const txtContent = `================================================================================
                       REPUBLIK KOPI INDONESIA
               KARTU TANDA PENGENAL KOPI (COFFEE ID CARD)
================================================================================
NOMOR KTP KOPI : ${coffee.ktpNumber || 'ID-KOPI-001'}
NAMA KOPI      : ${coffee.name}
EDISI TAMPILAN : ${modeName}
RATING         : ${starString} (${coffee.rating}/5)
DITERBITKAN    : ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}

--------------------------------------------------------------------------------
[1] SPESIFIKASI & TERROIR KOPI
--------------------------------------------------------------------------------
Spesies / Jenis    : ${coffee.type}
Asal Wilayah       : ${coffee.region}, ${coffee.originCountry}
Ketinggian Tumbuh  : ${coffee.altitudeRange}
Metode Proses      : ${coffee.process}
Tingkat Sangrai    : ${coffee.roastLevel} Roast
Kultivar / Varietal: ${coffee.varietal || '-'}
Petani / Produser  : ${coffee.producer || '-'}
Roaster            : ${coffee.roaster || '-'}
Tahun Panen (Crop) : ${coffee.harvestYear || '-'}
${coffee.scaScore ? `Skor SCA Cupping   : ${coffee.scaScore.toFixed(2)} / 100 (Grade 1 Specialty)\n` : ''}--------------------------------------------------------------------------------
[2] PROFIL RASA & SENSORI (TASTING NOTES)
--------------------------------------------------------------------------------
Kesan Rasa Utama   : "${coffee.casualDescription || coffee.generalCharacter}"
Catatan Rasa       : ${coffee.flavourNotes.join(', ')}

Skala Sensori:
- Keasaman (Acidity) : [${sensoryBar(coffee.acidity)}] (${coffee.acidity}/5)
- Ketebalan (Body)   : [${sensoryBar(coffee.body)}] (${coffee.body}/5)
- Rasa Manis (Sweet) : [${sensoryBar(coffee.sweetness)}] (${coffee.sweetness}/5)

Sensasi Kafein     : ${coffee.caffeineFeel}
Saran Minum Terbaik: ${coffee.bestWayToDrink || 'Seduh segar hangat / dingin'}

--------------------------------------------------------------------------------
[3] PANDUAN SEDUH BARISTA (DIAL-IN BREW RECIPE)
--------------------------------------------------------------------------------
Metode Seduh Saran : ${coffee.recommendedBrew?.join(', ') || 'V60 / Pour Over'}
Rasio Seduh        : ${coffee.brewRecipe?.ratio || '1:15'}
Suhu Air           : ${coffee.brewRecipe?.temperature || '92°C'}
Ukuran Gilingan    : ${coffee.brewRecipe?.grindSize || 'Medium-Fine'}
Target Waktu       : ${coffee.brewRecipe?.time || '2m 30s'}
Catatan Ekstraksi  : ${coffee.brewRecipe?.note || 'Tuang perlahan dengan gerakan spiral'}

${
  coffee.userNotes
    ? `--------------------------------------------------------------------------------
[4] CATATAN PRIBADI (USER LOG)
--------------------------------------------------------------------------------
${coffee.userNotes}
`
    : ''
}================================================================================
Status: TERVERIFIKASI • COFFEE ID REPUBLIK KOPI INDONESIA
================================================================================
`;

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName.replace(/\s+/g, '_')}_KTP_Kopi.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    return true;
  } catch (error) {
    console.error('Failed to export card as TXT:', error);
    return false;
  }
}

