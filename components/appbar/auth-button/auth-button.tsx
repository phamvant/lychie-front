"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Session } from "next-auth";
import SignInForm from "../../form/signin-form";
import SignUpForm from "../../form/signup-form";
import { Button } from "../../ui/button";
import ProfileButton from "./profile-button";

const AuthButton = ({ session }: { session: Session | null }) => {
  if (session && session.user) {
    const props = {
      userid: session.user.id,
      username: session.user.username,
    };
    return <ProfileButton props={props} />;
  }

  return (
    <div className="flex flex-row justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"sm"} className="h-8 mr-4" variant={"default"}>
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="w-5/6 rounded-lg">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <SignInForm />
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button size={"sm"} className="h-8" variant={"secondary"}>
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="w-5/6 rounded-lg">
          <DialogHeader>
            <DialogTitle>Sign Up Now</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <SignUpForm />
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthButton;
