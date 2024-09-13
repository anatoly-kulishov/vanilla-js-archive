const fromEnv = envVar => window?.env?.[envVar] || process.env[envVar]

export default fromEnv
