import Link from "next/link";
import { useRouter } from "next/router";
import handleSubmit from "./form-handler";
import { Button } from "@/ui/button";
import type { Menu, MenuItem, MenuItemOptions } from "@/lib/zod/menu";

interface FooterProps {
  menu: Menu;
}

export function Footer({ menu }: FooterProps) {
  const { locale } = useRouter();
  const filteredItems = menu.filter((link) => link.langcode == locale);

  return (
    <footer className="pt-10 bg-gradient-to-br from-dark to-violet text-white border-t h-[500px] overflow-hidden flex justify-between items-start px-6">
      <div className="ml-12 flex-1 flex flex-col justify-center ">
        <p>WANT TO HEAR MORE?</p>
        <p className="font-normal">
          Our international experts are ready to help you.
          <br />
          <span className="underline">Contact us!</span>
        </p>
      </div>

      <div className="flex-1">
        <p className="pb-5 font-bold">Stay up to date with our newsletter</p>
        <p className="pb-5">"*" indicates required fields</p>
        <p className="pb-5">I'M INTERESTED IN</p>
        <div className="pb-5 flex space-x-4 mt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-primary-600" />
            <span className="ml-2">Wunder news</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-primary-600" />
            <span className="ml-2">Careers</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-primary-600" />
            <span className="ml-2">Events</span>
          </label>
        </div>
        <div className="pb-5 mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-transparent mt-1 block w-full border-0 border-b-2 border-white focus:ring-0 focus:border-white text-white placeholder-white"
            required
          />
        </div>
        <label className="inline-flex items-center">
          <input
            required
            type="checkbox"
            className="form-checkbox text-primary-600"
          />
          <span className="ml-2">
            I approve that Wunder process my personal data according to its
            privacy policy
          </span>
        </label>
        <form onSubmit={handleSubmit}>
          <Button variant="quatriary" className="mt-10 text-white">
            Subscribe
          </Button>
        </form>
      </div>
    </footer>
  );
}
