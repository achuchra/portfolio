import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<h2 className="text-xl">Project not found!</h2>
			<p className="text-xl">
				<Link href="/projects" className="link">
					/projects
				</Link>
			</p>
		</div>
	);
}
