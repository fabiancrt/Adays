import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CarouselContainer, Slide, ContentBox, Title, Content, Button, PrevButton, NextButton } from '../CSS/CarouselCardStyles';


const CarouselCard = ({ objective }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const mindOfSteelSlides = [
      {
        title: 'The Power of Positive Thinking',
        content: 'Discover how positive thinking can transform your mental health and resilience.',
        backgroundImage: 'url(https://res.cloudinary.com/jerrick/image/upload/v1687164878/649017ced6b8e0001d2a072a.jpg)',
        link: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/positive-thinking/art-20043950'
      },
      {
        title: 'Mindfulness Meditation Techniques',
        content: 'Learn effective mindfulness meditation techniques to enhance mental clarity and focus.',
        backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:1400/1*R3KE1LAMsDjINmyRvD4RMQ.jpeg)',
        link: 'https://www.mindful.org/mindfulness-how-to-do-it/'
      },
      {
        title: 'Overcoming Anxiety: Tips and Tricks',
        content: 'Explore practical tips and tricks to manage and overcome anxiety in daily life.',
        backgroundImage: 'url(https://cdn.prod.website-files.com/620e4101b2ce12a1a6bff0e8/643a2af92fea7e1508d486b9_Header_How%20to%20deal%20with%20anxiety_FEB23.webp)',
        link: 'https://amberstudent.com/blog/post/tips-on-how-to-deal-with-anxiety'
      },
      {
        title: 'Building Mental Toughness',
        content: 'Understand the key elements of building mental toughness and resilience.',
        backgroundImage: 'url(https://assets.clevelandclinic.org/transform/7162e17a-04c1-4165-9740-0264d68ae642/mentalStrength-961344078-770x553-1_jpg)',
        link: 'https://health.clevelandclinic.org/mental-strength'
      }
    ];

    const physicalTriumphSlides = [
      {
        title: 'The Ultimate Fitness Routine',
        content: 'Get the ultimate fitness routine to achieve your physical goals and stay in shape.',
        backgroundImage: 'url(https://whey91.com/cdn/shop/articles/maximizing-gains-the-ultimate-bro-split-workout-routine-whey91-com.png?v=1711772663&width=1170)',
        link: 'https://www.mensjournal.com/health-fitness/top-workout-routines-according-science-mens-journal'
      },
      {
        title: 'Nutrition for Peak Performance',
        content: 'Discover the best nutrition practices to fuel your body for peak performance.',
        backgroundImage: 'url(https://media.licdn.com/dms/image/D5612AQGPdNPBt9l39A/article-cover_image-shrink_600_2000/0/1714565387807?e=2147483647&v=beta&t=32oyDHL_zOv269QLakM6csuRw3wUVMD6_Qym3i8JWyo)',
        link: 'https://www.uwhealth.org/news/eating-for-peak-athletic-performance'
      },
      {
        title: 'Strength Training Essentials',
        content: 'Learn the essentials of strength training to build muscle and improve overall fitness.',
        backgroundImage: 'url(https://hips.hearstapps.com/hmg-prod/images/man-lifting-dumbells-at-cross-training-gym-royalty-free-image-1625601682.jpg?crop=0.612xw:0.918xh;0.252xw,0.0816xh&resize=640:*)',
        link: 'https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/strength-training/art-20046670'
      },
      {
        title: 'Recovery and Rest: The Key to Success',
        content: 'Understand the importance of recovery and rest in achieving your fitness goals.',
        backgroundImage: 'url(https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/26939/images/c02c271-476f-eae4-a8bf-4827684da8_061720e-fcc3-4e35-5f1d-aace8c8ac7ad_Website_Cover_Images.png)',
        link: 'https://www.topfitnessgoals.ca/blog/rest-and-recovery'
      }
    ];

    const spiritElevationSlides = [
      {
        title: 'The Journey to Inner Peace',
        content: 'Embark on a journey to inner peace through spiritual practices and mindfulness.',
        backgroundImage: 'url(https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/10482/images/5d7c527-e25d-c85e-2301-be3c28a01e0_DALL_E_2024-01-11_14.46.45_-_Create_an_image_for_the_article_Spirituality_The_Core_of_Personal_Fulfillment_in_a_motivational_article_series._The_image_should_visually_represent.png)',
        link: 'https://www.oprahdaily.com/life/a29474453/how-to-find-inner-peace/'
      },
      {
        title: 'Connecting with Your Higher Self',
        content: 'Learn how to connect with your higher self and unlock your spiritual potential.',
        backgroundImage: 'url(https://t3.ftcdn.net/jpg/07/90/86/60/360_F_790866063_s2uPfbJqp6iVHkIFIZZN0cEDWE5De8N4.jpg)',
        link: 'https://www.higherselfyoga.org/articles/10-ways-to-connect-with-your-higher-self'
      },
      {
        title: 'The Power of Gratitude',
        content: 'Discover the transformative power of gratitude in your spiritual journey.',
        backgroundImage: 'url(https://manhattanmentalhealthcounseling.com/wp-content/uploads/2020/05/the-power-of-gratitude.jpeg)',
        link: 'https://www.calm.com/blog/power-of-gratitude'
      },
      {
        title: 'Meditation for Spiritual Growth',
        content: 'Explore meditation techniques that promote spiritual growth and enlightenment.',
        backgroundImage: 'url(https://enhancedapp.io/wp-content/uploads/2023/08/What-is-Spiritual-Meditation-1024x585.jpg.webp)',
        link: 'https://themindfulsteward.com/meditation/connect-with-your-higher-self-a-guide-to-spiritual-meditation/'
      }
    ];

    switch (objective) {
      case 'mind of steel':
        setSlides(mindOfSteelSlides);
        break;
      case 'physical triumph':
        setSlides(physicalTriumphSlides);
        break;
      case 'spirit elevation':
        setSlides(spiritElevationSlides);
        break;
      default:
        setSlides([]);
    }
  }, [objective]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <CarouselContainer>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            backgroundImage: slide.backgroundImage
          }}
        >
          <ContentBox>
            <Title>{slide.title}</Title>
            <Content>{slide.content}</Content>
            <Button href={slide.link} target="_blank" rel="noopener noreferrer">Read More</Button>
          </ContentBox>
        </Slide>
      ))}
      <PrevButton onClick={prevSlide}>‹</PrevButton>
      <NextButton onClick={nextSlide}>›</NextButton>
    </CarouselContainer>
  );
};

export default CarouselCard;