import axios from "axios";
import {_baseURL} from "../constants";

export const baseInstance = axios.create({
    baseURL: _baseURL
});

