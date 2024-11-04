export enum AuthFormFields {
  EMAIL = "email",
  PASSWORD = "password",
  PHONE = "phone",
}

export enum JWTEnum {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const REFRESHTOKENLIVETIME = 7 * 24 * 60 * 60; 