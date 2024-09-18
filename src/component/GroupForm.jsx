import { useState } from 'react';
import data from '../data/absen.json'; // Pastikan kamu sudah mengimpor data mahasiswa

const GroupForm = ({ onSubmit }) => {
    const [totalKelompok, setTotalKelompok] = useState('');
    const [mahasiswaPerkelompok, setMahasiswaPerkelompok] = useState('');
    const [saranJumlahMahasiswa, setsaranJumlahMahasiswa] = useState(null);
    const [saranTotalKelompok, setsaranTotalKelompok] = useState(null);

    const totalMahasiswa = data.length;

    const handleTotalKelompokChange = (e) => {
        const totalKelompokValue = e.target.value;
        setTotalKelompok(totalKelompokValue);

        if (totalKelompokValue && totalMahasiswa) {
            const rataRata = Math.floor(totalMahasiswa / totalKelompokValue);
            const sisa = totalMahasiswa % totalKelompokValue;

            if (sisa > 0) {
                setsaranJumlahMahasiswa(`${rataRata} - ${rataRata + 1} siswa per kelompok (sisa ${sisa} mahasiswa)`);
            } else {
                setsaranJumlahMahasiswa(`${rataRata} siswa per kelompok`);
            }
        } else {
            setsaranJumlahMahasiswa(null);
        }
    };

    const handleMahasiswaPerKelompokChange = (e) => {
        const mahasiswaPerkelompokValue = e.target.value;
        setMahasiswaPerkelompok(mahasiswaPerkelompokValue);

        if (mahasiswaPerkelompokValue && totalMahasiswa) {
            const estimatedTotalKelompok = Math.ceil(totalMahasiswa / mahasiswaPerkelompokValue);
            setsaranTotalKelompok(`${estimatedTotalKelompok} kelompok dibutuhkan.`);
        } else {
            setsaranTotalKelompok(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(parseInt(totalKelompok), parseInt(mahasiswaPerkelompok));
    };

    return (
        <form onSubmit={handleSubmit} className='p-4 max-w-lg mx-auto'>
            <div className='mb-4'>
                <label htmlFor="totalKelompok" className="block text-sm font-medium text-slate-100">
                    Total Kelompok:
                </label>
                <input
                    type="number"
                    id="totalKelompok"
                    value={totalKelompok}
                    onChange={handleTotalKelompokChange}
                    className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
                {saranJumlahMahasiswa && (
                    <p className="mt-2 text-sm text-slate-400">
                        Saran: {saranJumlahMahasiswa}
                    </p>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor="mahasiswaPerkelompok" className="block text-sm font-medium text-slate-100">
                    Jumlah Perkelompok:
                </label>
                <input
                    type="number"
                    id="mahasiswaPerkelompok"
                    value={mahasiswaPerkelompok}
                    onChange={handleMahasiswaPerKelompokChange}
                    className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
                {saranTotalKelompok && (
                    <p className="mt-2 text-sm text-slate-400">
                        Saran: {saranTotalKelompok}
                    </p>
                )}
            </div>
            <button
                type='submit'
                className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-21'
            >
                Buat ngab
            </button>
        </form>
    );
};

export default GroupForm;
