export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    msg: string,
    token: string,
    userId: string
}

export type RegisterRequest = {
    email: string,
    password: string
}

export type RegisterResponse = {
    msg: string
}

export type User = {
    id: string,
    email: string
}

export type CreateSignature = {
    name: string, 
    dueDate: string, 
    dayAlert: number
}

export type Signatures = { 
    _id: string
    name: string, 
    dueDate: string, 
    dayAlert: number
}

export type SignaturesResponse = {
    data: Signatures[],
}

export type AddSignatureResponse = {
  msg: string
  data: Signatures
}

export type DashboardUser = User & {
    signatures: Signatures[]
}

export type DashboardUserResponse = {
    user: DashboardUser
}