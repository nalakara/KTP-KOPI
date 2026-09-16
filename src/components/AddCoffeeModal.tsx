import React, { useState } from 'react';
import { CoffeeCardItem, CoffeeType, RoastLevel } from '../types';
import { Sparkles, X, Loader2, Check, AlertCircle, Wand2, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddCoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coffee: CoffeeCardItem) => void;
}

export const AddCoffeeModal: React.FC<AddCoffeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  // Input fields for Smart AI auto-fill
  const [inputName, setInputName] = useState('');
  const [inputProcess, setInputProcess] = useState('');
  const [inputRoastLevel, setInputRoastLevel] = useState<RoastLevel>('Light-Medium');
  const [inputOrigin, setInputOrigin] = useState('');

  // Detailed fields (auto-completed or edited)
  const [region, setRegion] = useState('');
  const [altitudeRange, setAltitudeRange] = useState('');
  const [coffeeType, setCoffeeType] = useState<CoffeeType>('Arabika');
  const [varietal, setVarietal] = useState('');
  const [producer, setProducer] = useState('');
  const [generalCharacter, setGeneralCharacter] = useState('');
  const [flavourNotesText, setFlavourNotesText] = useState('');
  const [scaScore, setScaScore] = useState<string>('86.0');
  const [acidity, setAcidity] = useState<number>(3);
  const [body, setBody] = useState<number>(3);
  const [sweetness, setSweetness] = useState<number>(4);
  const [recommendedBrew, setRecommendedBrew] = useState('V60, Aeropress');
  const [casualDescription, setCasualDescription] = useState('');
  const [bestWayToDrink, setBestWayToDrink] = useState('');
  const [caffeineFeel, setCaffeineFeel] = useState<'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang'>('Sedang & Pas');
  const [userRating, setUserRating] = useState<number>(5);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Smart AI Auto-Complete
  const handleSmartAutoComplete = async () => {
    if (!inputName.trim() && !inputOrigin.trim()) {
      setAiError('Masukkan setidaknya Nama Kopi atau Asal Daerah terlebih dahulu.');
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
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Gagal melengkapi data secara otomatis.');
      }

      const data = result.data;

      // Auto-populate all fields
      if (data.name) setInputName(data.name);
      if (data.originCountry) setInputOrigin(data.originCountry);
      if (data.region) setRegion(data.region);
      if (data.altitudeRange) setAltitudeRange(data.altitudeRange);
      if (data.type) setCoffeeType(data.type);
      if (data.process) setInputProcess(data.process);
      if (data.roastLevel) setInputRoastLevel(data.roastLevel);
      if (data.varietal) setVarietal(data.varietal);
      if (data.producer) setProducer(data.producer);
      if (data.generalCharacter) setGeneralCharacter(data.generalCharacter);
      if (data.flavourNotes && Array.isArray(data.flavourNotes)) {
        setFlavourNotesText(data.flavourNotes.join(', '));
      }
      if (data.scaScore) setScaScore(String(data.scaScore));
      if (data.acidity) setAcidity(Number(data.acidity));
      if (data.body) setBody(Number(data.body));
      if (data.sweetness) setSweetness(Number(data.sweetness));
      if (data.recommendedBrew && Array.isArray(data.recommendedBrew)) {
        setRecommendedBrew(data.recommendedBrew.join(', '));
      }
      if (data.casualDescription) setCasualDescription(data.casualDescription);
      if (data.bestWayToDrink) setBestWayToDrink(data.bestWayToDrink);
      if (data.caffeineFeel) setCaffeineFeel(data.caffeineFeel);

      setAiSuccessMessage('Identitas kopi berhasil dilengkapi otomatis oleh AI! Silakan tinjau data di bawah.');

      // Celebrate
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error('AI Autocomplete error:', err);
      setAiError(err.message || 'Gagal menghubungi asisten AI.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputName.trim()) {
      setAiError('Nama kopi wajib diisi.');
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
      altitudeRange: altitudeRange.trim() || '1.200 - 1.600 mdpl',
      type: coffeeType,
      process: inputProcess.trim() || 'Natural Process',
      roastLevel: inputRoastLevel,
      generalCharacter: generalCharacter.trim() || 'Aromatik dengan profil rasa seimbang',
      flavourNotes: notesArray,
      varietal: varietal.trim() || 'Typica / Arabika Lokal',
      producer: producer.trim() || 'Petani Kopi Nusantara',
      scaScore: scaScore ? parseFloat(scaScore) : undefined,
      acidity,
      body,
      sweetness,
      recommendedBrew: brewsArray,
      brewRecipe: {
        ratio: '1:15 (15g kopi / 225ml air)',
        temperature: '92°C',
        grindSize: 'Medium-Fine',
        time: '2m 25s',
        note: 'Gunakan air mineral bersuhu 92°C untuk rasa optimal',
      },
      casualDescription:
        casualDescription.trim() ||
        'Kopi nikmat dengan rasa manis alami seimbang dan aroma menggugah selera.',
      bestWayToDrink: bestWayToDrink.trim() || 'Nikmat diseduh hitam segar atau dingin pakai es',
      caffeineFeel,
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
              <span>☕ Buat KTP Kopi Baru</span>
            </h2>
            <p className="text-[11px] text-[#332B1C]/75 mt-0.5">
              Masukkan sedikit informasi, AI akan melengkapi identitas lengkapnya!
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Smart AI Auto-Complete Highlight Box */}
        <div className="mt-4 p-3 rounded-none bg-[#E2F4CB] border border-[#332B1C] space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-[#332B1C] font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#332B1C]" />
              <span>Smart AI Auto-Complete</span>
            </div>
            <span className="text-[9px] font-mono-code bg-[#F0E5C5] text-[#332B1C] border border-[#332B1C] font-bold px-1.5 py-0.5 rounded-full">
              GEMINI 3.8 FLASH
            </span>
          </div>
          <p className="text-[11px] text-[#332B1C] leading-relaxed">
            Hanya tahu nama kopi dan prosesnya? Cukup ketik misalnya <strong>"Gayo"</strong>, proses <strong>"Natural"</strong>, lalu tekan tombol di bawah. AI akan otomatis melengkapi ketinggian tanam, varietal, rasa untuk orang biasa, hingga cupping score!
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
                <span>Sedang Menganalisis & Melengkapi Identitas Kopi...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 text-[#E2F4CB]" />
                <span>Lengkapi Identitas Otomatis dengan AI</span>
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
                Nama Kopi / Label Biji *
              </label>
              <input
                type="text"
                required
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Contoh: Gayo Avatara Natural"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Origin Country */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                Negara Asal (Country)
              </label>
              <input
                type="text"
                value={inputOrigin}
                onChange={(e) => setInputOrigin(e.target.value)}
                placeholder="Contoh: Indonesia / Ethiopia"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                Wilayah / Region
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Aceh Tengah, Pegunungan Gayo"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Altitude */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                Ketinggian (Altitude Range)
              </label>
              <input
                type="text"
                value={altitudeRange}
                onChange={(e) => setAltitudeRange(e.target.value)}
                placeholder="Contoh: 1.400 - 1.650 mdpl"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Species Type */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                Spesies / Tipe Kopi
              </label>
              <select
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value as CoffeeType)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="Arabika">Arabika</option>
                <option value="Robusta">Robusta</option>
                <option value="Liberika">Liberika</option>
                <option value="Excelsa">Excelsa</option>
                <option value="Blend">Blend (Campuran)</option>
              </select>
            </div>

            {/* Process */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                Metode Proses Pasca Panen
              </label>
              <input
                type="text"
                value={inputProcess}
                onChange={(e) => setInputProcess(e.target.value)}
                placeholder="Natural / Full Wash / Honey / Anaerobic"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>

            {/* Roast Level */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
                Tingkat Sangrai (Roasting)
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
                Kultivar / Varietal
              </label>
              <input
                type="text"
                value={varietal}
                onChange={(e) => setVarietal(e.target.value)}
                placeholder="Contoh: Typica, Ateng Super, Bourbon"
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
            </div>
          </div>

          {/* Flavour Notes */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
              Flavour Notes (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={flavourNotesText}
              onChange={(e) => setFlavourNotesText(e.target.value)}
              placeholder="Contoh: Nangka Matang, Gula Palem, Cokelat Hitam"
              className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
            />
          </div>

          {/* Casual Description */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#332B1C] mb-1">
              Deskripsi Bahasa Sehari-hari (Untuk Orang Biasa)
            </label>
            <textarea
              rows={2}
              value={casualDescription}
              onChange={(e) => setCasualDescription(e.target.value)}
              placeholder="Jelaskan rasanya dalam bahasa santai tanpa istilah teknis..."
              className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
            />
          </div>

          {/* Scales: Acidity, Body, Sweetness, SCA Score */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2.5 bg-[#F0E5C5] rounded-none border border-[#332B1C]">
            <div>
              <label className="block text-[10px] font-bold text-[#332B1C] mb-1 uppercase tracking-wider">
                Keasaman (1-5)
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
                Body/Pekat (1-5)
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
                Manis (1-5)
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
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1 text-xs text-center font-mono-code font-bold text-[#332B1C]"
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
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-[#F0E5C5] bg-[#332B1C] border border-[#332B1C] rounded-full hover:opacity-90 transition active:scale-95"
            >
              Simpan KTP Kopi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
