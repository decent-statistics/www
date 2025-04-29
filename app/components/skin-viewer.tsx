import { useEffect, useRef } from "react";
import { SkinViewer as SkinViewer3D, type SkinViewerOptions } from "skinview3d";

export function SkinViewer({
	className,
	width,
	height,
	skinUrl,
	capeUrl,
	onReady,
	options,
}: {
	className?: string;
	width: number | string;
	height: number | string;
	skinUrl: string;
	capeUrl?: string;
	onReady?: ({
		viewer,
		canvasRef,
	}: {
		viewer: SkinViewer3D;
		canvasRef: HTMLCanvasElement;
	}) => void;
	options?: SkinViewerOptions;
}) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const skinviewRef = useRef<SkinViewer3D | null>(null);

	// biome-ignore lint: initial render
	useEffect(() => {
		const viewer = new SkinViewer3D({
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			canvas: canvasRef.current!,
			width: Number(width),
			height: Number(height),
			...options,
		});

		// handle cape/skin load initially
		skinUrl && viewer.loadSkin(skinUrl);
		capeUrl && viewer.loadCape(capeUrl);

		skinviewRef.current = viewer;

		// call onReady with the viewer instance
		if (onReady && canvasRef.current) {
			onReady({ viewer: skinviewRef.current, canvasRef: canvasRef.current });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// skin url changes
	useEffect(() => {
		if (skinviewRef.current) {
			skinUrl
				? skinviewRef.current.loadSkin(skinUrl)
				: skinviewRef.current.resetSkin();
		}
	}, [skinUrl]);

	// cape url changes
	useEffect(() => {
		if (skinviewRef.current) {
			capeUrl
				? skinviewRef.current.loadCape(capeUrl)
				: skinviewRef.current.resetCape();
		}
	}, [capeUrl]);

	// size changes
	useEffect(() => {
		if (skinviewRef.current) {
			skinviewRef.current.setSize(Number(width), Number(height));
		}
	}, [width, height]);

	return <canvas className={className} ref={canvasRef} />;
}
