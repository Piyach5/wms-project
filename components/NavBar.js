import Logo from "@/public/asset/logo.png";
import Image from "next/image";

export default function NavBar() {
  return (
    <>
      <div className="flex flex-row justify-end items-center gap-5 p-5 bg-white">
        <Image
          src={Logo}
          width={30}
          height={200}
          alt="Logo Image"
          className="rounded-full w-auto h-auto"
        />
        <span className="text-green-500 font-extrabold">EASY WAREHOUSE</span>
      </div>
    </>
  );
}
