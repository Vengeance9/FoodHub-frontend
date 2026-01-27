import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
      {/* Left */}
      <div className="space-y-6">
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

      {/* Right */}
      <div className="relative h-[350px]">
        <Image
          src="/burger.jpg"
          alt="Food"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
