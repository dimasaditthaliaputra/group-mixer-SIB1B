import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

const GroupList = ({ groups, onBack }) => {
    const groupContainerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jumlahSoal, setJumlahSoal] = useState('');
    const [soalPerKelompok, setSoalPerKelompok] = useState([]);

    const downloadAllGroups = () => {
        const node = groupContainerRef.current;
        toPng(node)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = `kelompok.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error('Bentar ngab, error nihh kek nya!', error);
            });
    };

    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        
        return array;
    };

    const handleBagiSoal = (e) => {
        e.preventDefault();

        const soalArray = Array.from({ length: parseInt(jumlahSoal) }, (_, i) => i + 1);
        const shuffledSoalArray = shuffleArray(soalArray);

        const soalUntukSetiapKelompok = [];
        for (let i = 0; i < groups.length; i++) {
            soalUntukSetiapKelompok.push(shuffledSoalArray[i % shuffledSoalArray.length]);
        }

        setSoalPerKelompok(soalUntukSetiapKelompok);
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {groups.length > 0 ? (
                <>
                    <div ref={groupContainerRef} className="flex flex-wrap justify-center gap-4 mb-3">
                        {groups.map((group, index) => (
                            <div
                                key={index}
                                className="card bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                            >
                                <div className="card-body p-4">
                                    <h3 className="card-title text-lg text-slate-100 font-semibold mb-1">
                                        Kelompok {index + 1} {soalPerKelompok.length > 0 && `(Soal ${soalPerKelompok[index]})`}
                                    </h3>
                                    <ul className="list-disc ml-6">
                                        {group.map((student, idx) => (
                                            <li key={idx} className="text-sm text-slate-200">
                                                {student.name} ({student.id})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-0'>
                        <button
                            className="btn btn-secondary mt-2 block mx-auto text-slate-200"
                            onClick={onBack}
                        >
                            Kembali
                        </button>
                        <button
                            className="btn btn-primary mt-2 block mx-auto text-slate-200"
                            onClick={downloadAllGroups}
                        >
                            Download Image Bro
                        </button>
                        <button className='btn btn-primary mt-2 block mx-auto text-slate-200'
                        onClick={() => setIsModalOpen(true)}
                        >
                            Bagi soal😔
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-500">Belum ada kelompok.</p>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="card bg-slate-300 text-neutral-content py-6 px-8 w-1/5">
                        <h2 className="text-xl font-semibold mb-4 text-slate-800">Bagi Soal ke Kelompok</h2>
                        <form onSubmit={handleBagiSoal}>
                            <div className="mb-4">
                                <label htmlFor="jumlahSoal" className="block text-sm font-medium text-gray-700">
                                    Jumlah Soal:
                                </label>
                                <input
                                    type="number"
                                    id="jumlahSoal"
                                    value={jumlahSoal}
                                    onChange={(e) => setJumlahSoal(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-slate-90000 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary text-slate-800"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary text-slate-80000"
                                >
                                    Bagikan Soal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupList;
