import Navbar from '@/components/Navbar'
import React from 'react'

const About = () => {
	return (
		<div className='h-screen w-screen overflow-y-auto'>
			<Navbar />
			<div className='flex flex-col w-full h-full'>
				<div className='flex items-end justify-start w-full h-60 px-10 sm:px-16'>
					<div className='flex text-4xl sm:text-6xl font-extrabold gap-5 items-center py-5'>
						<p>ABOUT</p>
						<p className='text-secondary'>ME</p>
					</div>
				</div>
				<div className='flex flex-col gap-5 text-white font-semibold bg-primary w-full sm:h-full p-10 sm:p-16'>
					<p>
						Hello! I'm Muhammed Nasal KK, a passionate graphic designer with a deep love for creative expression and visual storytelling. I believe that design has the power to transform ideas into compelling visuals that leave a lasting impact.
					</p>

					<p>
						My Journey:
						I embarked on my graphic design journey with a mission to blend artistry with functionality. Over the 3 years, I've had the privilege of working on a diverse range of projects, from crafting brand identities for startups to designing eye-catching marketing materials for established businesses.
					</p>

					<p>
						My Approach:
						My design philosophy revolves around the perfect fusion of aesthetics and purpose. Every project I undertake is an opportunity to create designs that not only look great but also effectively communicate messages and resonate with audiences.
					</p>

					<p>
						What Sets Me Apart:
						Creativity: I thrive on creative challenges, pushing boundaries to deliver unique and innovative designs. Attention to Detail: Precision matters in design, and I meticulously ensure every element is pixel-perfect. Client Collaboration: Effective communication and collaboration with clients are at the core of my design process. I listen to your ideas and turn them into reality.
					</p>

					<p>
						Thank you for visiting my portfolio, and I look forward to the possibility of
						working with you.
					</p>
				</div>
			</div>
		</div>
	)
}

export default About
