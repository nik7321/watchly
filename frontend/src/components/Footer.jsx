const Footer = () => {
	return (
		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row'>
				<p className='text-balance text-center text-base leading-loose text-muted-foreground'>
					Your Feedback matters!{" "}
					<a
						href='https://github.com/nik7321'
						target='_blank'
						className='font-medium underline underline-offset-4'
					>
						Connect here
					</a>
				</p>
			</div>
		</footer>
	);
};
export default Footer;
