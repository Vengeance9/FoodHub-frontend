"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { authClient } from "@/lib/auth";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { data, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the same structure, only change the content
  return (
    <section className="container ml-10 px-4 py-20 grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl text-green-800">
          Welcome {mounted && data?.user ? data.user.name : "Guest"}
        </h1>

        <Badge>🍔 Fast & Fresh</Badge>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Order Your Favorite Food <br /> Anytime, Anywhere
        </h1>

        <p className="text-muted-foreground text-lg">
          FoodHub connects you with the best restaurants near you. Fresh meals,
          fast delivery.
        </p>

        <div className="flex gap-4">
          <Button size="lg">Order Now</Button>
          <Button variant="outline" size="lg">
            Explore Menu
          </Button>
        </div>
      </div>

      <div className="relative h-87.5">
        <Image src="/burger.jpg" alt="Food" fill className="object-contain" />
      </div>
    </section>
  );
}
