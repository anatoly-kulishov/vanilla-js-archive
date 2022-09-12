type RequestType = "SERVER" | "CLIENT" | "Server" | "Client";

/**
 * Uppercase<StringType>
 */
const requestServerUppercase: Uppercase<RequestType> = "SERVER"
const requestClientUppercase: Uppercase<RequestType> = "CLIENT"

/**
 * Lowercase<StringType>
 */
const requestServerLowercase: Lowercase<RequestType> = "server"
const requestClientLowercase: Lowercase<RequestType> = "client"

/**
 * Capitalize<StringType>
 */
const requestServerCapitalize: Capitalize<RequestType> = "Server"
const requestClientCapitalize: Capitalize<RequestType> = "Client"

/**
 * Uncapitalize<StringType>
 */
const requestServerUncapitalize: Uncapitalize<RequestType> = "server"
const requestClientUncapitalize: Uncapitalize<RequestType> = "client"