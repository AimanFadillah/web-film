import axios from "axios";

// const ConfigAxios = axios.create({ baseURL: "http://localhost:5000" })
const ConfigAxios = axios.create({ baseURL: "https://api-rebahin.vercel.app/" })

export default ConfigAxios;