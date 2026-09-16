import React, { useState } from 'react';
import { CoffeeCardItem, CoffeeType, RoastLevel, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  X,
  Sparkles,
  Wand2,
  Loader2,
  AlertCircle,
  Check,
  Languages,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddCoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coffee: CoffeeCardItem) => void;
  lang?: Language;
}

export const AddCoffeeModal: React.FC<AddCoffeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lang = 'id',
}) => {
  const t = TRANSLATIONS[lang];

  // Basic Details State
  const [inputName, setInputName] = useState('');
  const [inputOrigin, setInputOrigin] = useState('Indonesia');
  const [region, setRegion] = useState('');
  const [regionEn, setRegionEn] = useState('');
  const [altitudeRange, setAltitudeRange] = useState('');
  const [altitudeRangeEn, setAltitudeRangeEn] = useState('');
  const [coffeeType, setCoffeeType] = useState<CoffeeType>('Arabika');
  const [inputProcess, setInputProcess] = useState('Natural');
  const [processEn, setProcessEn] = useState('');
  const [inputRoastLevel, setInputRoastLevel] = useState<RoastLevel>('Medium');

  // Specs & Notes
  const [varietal, setVarietal] = useState('');
  const [producer, setProducer] = useState('');
  const [generalCharacter, setGeneralCharacter] = useState('');
  const [generalCharacterEn, setGeneralCharacterEn] = useState('');
  const [flavourNotesText, setFlavourNotesText] = useState('');
  const [flavourNotesTextEn, setFlavourNotesTextEn] = useState('');
  const [scaScore, setScaScore] = useState('');

  // Scales (1 - 5)
  const [acidity, setAcidity] = useState(3);
  const [body, setBody] = useState(3);
  const [sweetness, setSweetness] = useState(4);

  // Casual & Serving
  const [casualDescription, setCasualDescription] = useState('');
  const [casualDescriptionEn, setCasualDescriptionEn] = useState('');
  const [bestWayToDrink, setBestWayToDrink] = useState('');
  const [bestWayToDrinkEn, setBestWayToDrinkEn] = useState('');
  const [caffeineFeel, setCaffeineFeel] = useState<
    'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang'
  >('Sedang & Pas');
  const [caffeineFeelEn, setCaffeineFeelEn] = useState('');
  const [recommendedBrew, setRecommendedBrew] = useState('V60, Tubruk');
  const [userRating, setUserRating] = useState(5);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Smart AI Auto-Complete
  const handleSmartAutoComplete = async () => {
    if (!inputName.trim() && !inputOrigin.trim()) {
      setAiError(
        lang === 'en'
          ? 'Please enter at least the Coffee Name or Origin Region first.'
          : 'Masukkan setidaknya Nama Kopi atau Asal Daerah terlebih dahulu.'
      );
      return;
    }

    setIsLoadingAI(true);
    setAiError(null);
    setAiSuccessMessage(null);

    try {
      const response = await fetch('/api/coffee/autocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inputName,
          process: inputProcess,
          roastLevel: inputRoastLevel,
          origin: inputOrigin,
          lang,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            (lang === 'en'
              ? 'Failed to auto-complete coffee specifications.'
              : 'Gagal melengkapi data secara otomatis.')
        );
      }

      const data = result.data;

      // Auto-populate fields
      if (data.name) setInputName(data.name);
      if (data.originCountry) setInputOrigin(data.originCountry);
      if (data.region) setRegion(data.region);
      if (data.regionEn) setRegionEn(data.regionEn);
      if (data.altitudeRange) setAltitudeRange(data.altitudeRange);
      if (data.altitudeRangeEn) setAltitudeRangeEn(data.altitudeRangeEn);
      if (data.type) setCoffeeType(data.type);
      if (data.process) setInputProcess(data.process);
      if (data.processEn) setProcessEn(data.processEn);
      if (data.roastLevel) setInputRoastLevel(data.roastLevel);
      if (data.varietal) setVarietal(data.varietal);
      if (data.producer) setProducer(data.producer);
      if (data.generalCharacter) setGeneralCharacter(data.generalCharacter);
      if (data.generalCharacterEn) setGeneralCharacterEn(data.generalCharacterEn);
      if (data.flavourNotes && Array.isArray(data.flavourNotes)) {
        setFlavourNotesText(data.flavourNotes.join(', '));
      }
      if (data.flavourNotesEn && Array.isArray(data.flavourNotesEn)) {
        setFlavourNotesTextEn(data.flavourNotesEn.join(', '));
      }
      if (data.scaScore) setScaScore(String(data.scaScore));
      if (data.acidity) setAcidity(Number(data.acidity));
      if (data.body) setBody(Number(data.body));
      if (data.sweetness) setSweetness(Number(data.sweetness));
      if (data.recommendedBrew && Array.isArray(data.recommendedBrew)) {
        setRecommendedBrew(data.recommendedBrew.join(', '));
      }
      if (data.casualDescription) setCasualDescription(data.casualDescription);
      if (data.casualDescriptionEn) setCasualDescriptionEn(data.casualDescriptionEn);
      if (data.bestWayToDrink) setBestWayToDrink(data.bestWayToDrink);
      if (data.bestWayToDrinkEn) setBestWayToDrinkEn(data.bestWayToDrinkEn);
      if (data.caffeineFeel) setCaffeineFeel(data.caffeineFeel);
      if (data.caffeineFeelEn) setCaffeineFeelEn(data.caffeineFeelEn);

      setAiSuccessMessage(
        lang === 'en'
          ? 'Coffee identity successfully enriched with bilingual specialty specs! Review the details below.'
          : 'Identitas kopi berhasil dilengkapi otomatis oleh AI! Silakan tinjau data di bawah.'
      );

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error('AI Autocomplete error:', err);
      setAiError(
        err.message ||
          (lang === 'en'
            ? 'Failed to connect to AI assistant.'
            : 'Gagal menghubungi asisten AI.')
      );
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputName.trim()) {
      setAiError(lang === 'en' ? 'Coffee name is required.' : 'Nama kopi wajib diisi.');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const countryCode = inputOrigin.toLowerCase().includes('indonesia') ? 'ID' : 'INT';
    const regionCode = region ? region.slice(0, 2).toUpperCase() : 'CO';
    const ktpNumber = `${countryCode}-${regionCode}-${new Date().getFullYear()}-${randomSuffix}`;

    const notesArray = flavourNotesText
      ? flavourNotesText
          .split(',')
          .map((n) => n.trim())
          .filter(Boolean)
      : ['Cokelat', 'Karamel', 'Fruity'];

    const notesEnArray = flavourNotesTextEn
      ? flavourNotesTextEn
          .split(',')
          .map((n) => n.trim())
          .filter(Boolean)
      : undefined;

    const brewsArray = recommendedBrew
      ? recommendedBrew
          .split(',')
          .map((b) => b.trim())
          .filter(Boolean)
      : ['V60', 'Tubruk'];

    const newCoffee: CoffeeCardItem = {
      id: `coffee-${Date.now()}`,
      ktpNumber,
      name: inputName.trim(),
      originCountry: inputOrigin.trim() || 'Indonesia',
      region: region.trim() || 'Origin Spesifik',
      regionEn: regionEn.trim() || undefined,
      altitudeRange: altitudeRange.trim() || '1.200 - 1.600 mdpl',
      altitudeRangeEn: altitudeRangeEn.trim() || undefined,
      type: coffeeType,
      process: inputProcess.trim() || 'Natural Process',
      processEn: processEn.trim() || undefined,
      roastLevel: inputRoastLevel,
      generalCharacter:
        generalCharacter.trim() || 'Aromatik dengan profil rasa seimbang',
      generalCharacterEn: generalCharacterEn.trim() || undefined,
      flavourNotes: notesArray,
      flavourNotesEn: notesEnArray,
      varietal: varietal.trim() || 'Typica / Arabika Lokal',
      producer: producer.trim() || 'Petani Kopi Nusantara',
      scaScore: scaScore ? parseFloat(scaScore) : undefined,
      acidity,
      body,
      sweetness,
      recommendedBrew: brewsArray,
      brewRecipe: {
        ratio: '1:15 (15g kopi / 225ml water)',
        temperature: '92°C',
        grindSize: 'Medium-Fine',
        time: '2m 25s',
        note:
          lang === 'en'
            ? 'Gentle spiral pour maintaining slurry temperature at 92°C'
            : 'Gunakan air bersuhu 92°C dan tuang perlahan untuk rasa optimal',
      },
      casualDescription:
        casualDescription.trim() ||
        'Kopi nikmat dengan rasa manis alami seimbang dan aroma menggugah selera.',
      casualDescriptionEn:
        casualDescriptionEn.trim() ||
        'A pleasant, naturally balanced cup with gentle sweetness and a welcoming aroma.',
      bestWayToDrink:
        bestWayToDrink.trim() || 'Nikmat diseduh hitam segar atau dingin pakai es',
      bestWayToDrinkEn:
        bestWayToDrinkEn.trim() || 'Delicious served fresh black or over ice',
      caffeineFeel,
      caffeineFeelEn: caffeineFeelEn.trim() || undefined,
      rating: userRating,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSave(newCoffee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/75 backdrop-blur-xs p-4 overflow-y-auto font-mono-code">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none bg-[#F0E5C5] p-5 md:p-6 shadow-2xl border border-[#332B1C] text-[#332B1C] my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#332B1C]">
          <div>
            <h2 className="text-2xl font-medium font-display tracking-tight text-[#332B1C] flex items-center gap-2">
              <span>☕ {t.addModalTitle}</span>
            </h2>
            <p className="text-[11px] text-[#332B1C]/75 mt-0.5">
              {t.addModalSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C] transition"
            title={t.detailCloseBtn}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Smart AI Auto-Complete Highlight Box */}
        <div className="mt-4 p-3 rounded-none bg-[#E2F4CB] border border-[#332B1C] space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-[#332B1C] font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#332B1C]" />
              <span>{t.addAiCardTitle}</span>
            </div>
            <span className="text-[9px] bg-[#F0E5C5] text-[#332B1C] border border-[#332B1C] font-bold px-1.5 py-0.5 rounded-full">
              GEMINI 2.5 FLASH
            </span>
          </div>
          <p className="text-[11px] text-[#332B1C] leading-relaxed">
            {t.addAiCardDesc}
          </p>

          <button
            type="button"
            id="btn-ai-autocomplete"
            onClick={handleSmartAutoComplete}
            disabled={isLoadingAI}
            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-full bg-[#332B1C] text-[#F0E5C5] border border-[#332B1C] font-medium text-xs shadow-sm hover:opacity-90 active:scale-95 transition disabled:opacity-50"
          >
            {isLoadingAI ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E2F4CB]" />
                <span>{t.addAiLoadingBtn}</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 text-[#E2F4CB]" />
                <span>{t.addAiButton}</span>
              </>
            )}
          </button>

          {aiError && (
            <div className="flex items-center gap-2 p-2 rounded-none bg-[#F0E5C5] text-red-700 text-xs border border-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}

          {aiSuccessMessage && (
            <div className="flex items-center gap-2 p-2 rounded-none bg-[#F0E5C5] text-emerald-800 text-xs border border-emerald-800">
              <Check className="w-4 h-4 shrink-0 text-emerald-800" />
              <span>{aiSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* Full Form */}
        <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldName}
              </label>
              <input
                type="text"
                required
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder={t.addPlaceholderName}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Origin Country */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldCountry}
              </label>
              <input
                type="text"
                value={inputOrigin}
                onChange={(e) => setInputOrigin(e.target.value)}
                placeholder={t.addPlaceholderCountry}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Region (ID & EN) */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldRegion}
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder={t.addPlaceholderRegion}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Altitude */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldAltitude}
              </label>
              <input
                type="text"
                value={altitudeRange}
                onChange={(e) => setAltitudeRange(e.target.value)}
                placeholder={t.addPlaceholderAltitude}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Species Type */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldSpecies}
              </label>
              <select
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value as CoffeeType)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="Arabika">Arabika (Arabica)</option>
                <option value="Robusta">Robusta (Fine Canephora)</option>
                <option value="Liberika">Liberika (Liberica)</option>
                <option value="Excelsa">Excelsa</option>
                <option value="Blend">Blend / House Blend</option>
              </select>
            </div>

            {/* Process */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldProcess}
              </label>
              <input
                type="text"
                value={inputProcess}
                onChange={(e) => setInputProcess(e.target.value)}
                placeholder="Natural / Washed / Honey / Anaerobic"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Roast Level */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldRoast}
              </label>
              <select
                value={inputRoastLevel}
                onChange={(e) => setInputRoastLevel(e.target.value as RoastLevel)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="Light">Light Roast</option>
                <option value="Light-Medium">Light-Medium</option>
                <option value="Medium">Medium Roast</option>
                <option value="Medium-Dark">Medium-Dark</option>
                <option value="Dark">Dark Roast</option>
              </select>
            </div>

            {/* Varietal */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                {t.addFieldVarietal}
              </label>
              <input
                type="text"
                value={varietal}
                onChange={(e) => setVarietal(e.target.value)}
                placeholder="Typica, Bourbon, Ateng Super, Heirloom"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>
          </div>

          {/* Flavour Notes */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
              {t.addFieldFlavours}
            </label>
            <input
              type="text"
              value={flavourNotesText}
              onChange={(e) => setFlavourNotesText(e.target.value)}
              placeholder="Contoh: Nangka Matang, Gula Aren, Dark Chocolate"
              className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
            />
          </div>

          {/* Casual Description */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
              {t.addFieldCasualDesc}
            </label>
            <textarea
              rows={2}
              value={casualDescription}
              onChange={(e) => setCasualDescription(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Describe in friendly, easy-to-understand words for casual drinkers...'
                  : 'Jelaskan rasanya dalam bahasa santai tanpa istilah teknis...'
              }
              className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
            />
          </div>

          {/* Scales: Acidity, Body, Sweetness, SCA Score */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2.5 bg-[#F0E5C5] rounded-none border border-[#332B1C]">
            <div>
              <label className="block text-[10px] font-bold text-[#332B1C] mb-1 uppercase tracking-wider">
                {t.scaleAcidity} (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={acidity}
                onChange={(e) => setAcidity(Number(e.target.value))}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1 text-xs text-center"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#332B1C] mb-1 uppercase tracking-wider">
                {t.scaleBody} (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={body}
                onChange={(e) => setBody(Number(e.target.value))}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1 text-xs text-center"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#332B1C] mb-1 uppercase tracking-wider">
                {t.scaleSweetness} (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1 text-xs text-center"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#332B1C] mb-1 uppercase tracking-wider">
                SCA Score
              </label>
              <input
                type="number"
                step="0.25"
                min="70"
                max="100"
                value={scaScore}
                onChange={(e) => setScaScore(e.target.value)}
                placeholder="86.5"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1 text-xs text-center font-bold text-[#332B1C]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#332B1C]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-[#332B1C] hover:bg-[#332B1C]/10 border border-[#332B1C] rounded-full transition"
            >
              {t.addCancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-[#F0E5C5] bg-[#332B1C] border border-[#332B1C] rounded-full hover:opacity-90 transition active:scale-95"
            >
              {t.addSubmitBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
