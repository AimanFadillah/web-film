import axios from "axios";

const ConfigAxios = axios.create({baseURL:"http://localhost:5000"})

export default ConfigAxios;