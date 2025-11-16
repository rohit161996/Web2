import Link from "next/link";

export default function Home() {

  return (
    <div className="text-lg w-screen h-screen flex itmes-center justify-center">
      {/* Heading */}
      <div>
        Todo Application!!! <br />

        {/* Button 1 */}
        <Link href="/signin">
          Sign In to Todo app
        </Link ><br />

        {/* Button 2 */}
        <Link href="/signup">
          Sign Up to Todo app
        </Link ><br />
      </div>

    </div>
  );
}
