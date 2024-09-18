import { useState } from "react";
import GroupForm from "./component/GroupForm";
import GroupList from "./component/GroupList";
import data from "./data/absen.json";

function App() {
  const [groups, setGroups] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const acakKelompok = (totalKelompok, mahasiswaPerKelompok) => {
    const totalMahasiswa = data.length;
    const kelompok = [];
    const acakMahasiswa = data.sort(() => Math.random() - 0.5);

    const mahasiswaPerKelompokUtama = Math.floor(totalMahasiswa / totalKelompok);
    const sisaMahasiswa = totalMahasiswa % totalKelompok;

    let startIndex = 0;

    for (let i = 0; i < totalKelompok; i++) {
      let jumlahMahasiswaKelompok = mahasiswaPerKelompokUtama;
      if (i < sisaMahasiswa) {
        jumlahMahasiswaKelompok++;
      }
      kelompok.push(acakMahasiswa.slice(startIndex, startIndex + jumlahMahasiswaKelompok));
      startIndex += jumlahMahasiswaKelompok;
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
