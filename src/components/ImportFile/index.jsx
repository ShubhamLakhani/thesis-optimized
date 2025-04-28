import Papaparse from 'papaparse'
import { loadFile } from '../../utils/loadFile'
import { setExtractedData, setIsLoading } from '../../store/dataSlice'
import { useDispatch } from 'react-redux'

const ImportFile = () => {
    const dispatch = useDispatch()

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        dispatch(setIsLoading(true))
        loadFile(file, (data) => {
            console.log({data})
            localStorage.setItem('extractedData', JSON.stringify(data))
            dispatch(setExtractedData(data))
        })
    }
    return (
        <section className='max-w-md mx-auto'>
            <h2 className='text-lg font-semibold text-center mb-4'>Upload Your Data File Here .csv or .json</h2>
            <label
                htmlFor="file-upload"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:border-blue-400 transition-colors"
            >
            <span className='flex w-[24px] ml-2 h-[24px] items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4" />
            </svg>
            </span>
            <p className="text-sm text-gray-600">
                <span className="font-medium ">Drop your file here or </span>
                <span className=" underline">Browse</span>
            </p>
            <p className="text-xs text-gray-400">Maximum file size 50mb</p>
            <input
                id="file-upload"
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="hidden"
            />
            </label>
        </section>
    )
}

export default ImportFile
