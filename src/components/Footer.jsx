import Image from "next/image";
import logo from "../images/footer.png";

export default function Footer() {
  return (
    <footer className="mx-2 border-t border-white/5 bg-[#08090b]">
      <div className="flex h-[102px] items-center justify-between px-7">
        <Image
          src={logo}
          alt="FitLog"
          width={82}
          height={30}
          className="h-auto w-[82px] object-contain"
        />

        <p className="text-[13px] text-[#626874]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
