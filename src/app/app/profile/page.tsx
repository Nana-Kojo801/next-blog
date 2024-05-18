"use client";
import "./page.css";
import { FaLock, FaUser } from "react-icons/fa";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getUser, updateUser } from "@/lib/actions/user.actions";
import { useFormState, useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="primary-btn">
      {pending ? "Updating..." : "Update profile"}
    </button>
  );
};

const Page = () => {
  const [user, setUser] = useState<any>();
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [state, formAction] = useFormState(updateUser, {});

  useEffect(() => {
    getUser().then((data) => {
      if (data?.image) setUrl(data.image);
      setUser(data);
    });
  }, []);

  const handleImageChange = (e: ChangeEvent) => {
    const newUrl = URL.createObjectURL(fileRef.current?.files[0]);

    setUrl(newUrl);
  };
  return (
    <div className="profile-page">
      <div className="image-area">
        {user?.image === null && url !== "" ? (
          <Image fill src={url} alt="profile image" />
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="image-placeholder"
          >
            {user?.name.charAt(0)}
          </div>
        )}
      </div>
      <form action={formAction}>
        <input onChange={handleImageChange} name="image" ref={fileRef} type="file" />
        <div className="field">
          <input
            name="username"
            defaultValue={user?.name}
            type="text"
            placeholder="Username"
          />
          <FaUser />
        </div>
        <div className="field">
          <input
            name="password"
            defaultValue={user?.hashPassword}
            type="password"
            placeholder="Password"
          />
          <FaLock />
        </div>
        <UpdateButton />
      </form>
    </div>
  );
};

export default Page;
