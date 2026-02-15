
import "better-auth/client";

declare module "better-auth/client" {
  interface User {
    role: "CUSTOMER" | "PROVIDER" | "ADMIN"; 
  }
}
