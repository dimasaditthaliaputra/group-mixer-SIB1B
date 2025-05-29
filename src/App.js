import { useState } from "react";
import GroupForm from "./component/GroupForm";
import GroupList from "./component/GroupList";
import data from "./data/absen.json";

function App() {
  const [groups, setGroups] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const fisherYatesShuffle = (array) => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const acakKelompok = (totalKelompok, mahasiswaPerKelompok) => {
    const totalMahasiswa = data.length;
    const kelompok = [];

    const abel = data.find((m) => m.id === 2);
    const kandidatTeman = [7, 9, 10, 17].map((id) => data.find((m) => m.id === id)).filter(Boolean);

    const temanTerpilih = kandidatTeman[Math.floor(Math.random() * kandidatTeman.length)];

    const sisaMahasiswa = data.filter((m) => m.id !== abel.id && m.id !== temanTerpilih.id);

    const shuffled = fisherYatesShuffle(sisaMahasiswa);

    const paketAbel = [abel, temanTerpilih];

    const mahasiswaPerKelompokUtama = Math.floor(totalMahasiswa / totalKelompok);
    const sisa = totalMahasiswa % totalKelompok;

    const randomGroupIndex = Math.floor(Math.random() * totalKelompok);

    let startIndex = 0;
    for (let i = 0; i < totalKelompok; i++) {
      let jumlahMahasiswa = mahasiswaPerKelompokUtama;
      if (i < sisa) jumlahMahasiswa++;

      let jumlahDiambil = jumlahMahasiswa;

      let anggotaKelompok = [];

      if (i === randomGroupIndex) {
        jumlahDiambil = jumlahMahasiswa - paketAbel.length;
        anggotaKelompok = [...paketAbel, ...shuffled.slice(startIndex, startIndex + jumlahDiambil)];
      } else {
        anggotaKelompok = shuffled.slice(startIndex, startIndex + jumlahDiambil);
      }

      kelompok.push(anggotaKelompok);
      startIndex += jumlahDiambil;
    }

    setGroups(kelompok);
    setIsFormVisible(false);
  };

  const handleBack = () => {
    setIsFormVisible(true);
  };

  return (
    <div className="min-h-screen bg-slate-300 flex items-center justify-center">
      {isFormVisible ? (
        <div class="card bg-neutral text-neutral-content py-6 px-8 w-96">
          <div>
            <h1 className="text-2xl font-bold text-center p-4 text-slate-100">Group Mixer SIB-1B</h1>
            <GroupForm onSubmit={acakKelompok} />
          </div>
        </div>
      ) : (
        <GroupList groups={groups} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
