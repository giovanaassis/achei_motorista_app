import LoginImage from "@/public/login-bg.jpg"
import Image from "next/image"

function LoginBackground() {
  return (
    <div className="relative w-[60%] min-h-screen hidden md:block">
      <Image
        src={LoginImage}
        alt="login-visual-background"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}

export default LoginBackground