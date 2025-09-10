"use client";

import { signIn } from "next-auth/react";
import { IconType } from "react-icons";

interface SocialLoginButtonProps {
  provider: "google" | "facebook";
  icon: IconType;
  label: string;
  bgColor?: string;
  iconColor?: string;
}

export default function SocialLoginButton({ provider, icon: Icon, label, bgColor = "#D9D9D9", iconColor }: SocialLoginButtonProps) {
  const handleLogin = () => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogin}
      className={`w-full bg-[${bgColor}] font-semibold p-3 rounded-sm uppercase flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity`}
    >
      <Icon color={iconColor} size={20} />
      <span>{label}</span>
    </button>
  );
}