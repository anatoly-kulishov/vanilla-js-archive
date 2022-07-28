import axios from "axios";
import {_apiBase} from "../constants";

export const baseInstance = axios.create({
    baseURL: _apiBase
});