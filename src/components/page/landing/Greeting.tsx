import Button from "@/components/ui/Button";
import Image from 'next/image'

function Greeting() {
    return (
        <>
            <section className={'flex flex-col w-fit h-fit gap-[2vw]'}>
                <strong className={'font-bold text-6xl text-white'}>
                    SEE YOUR LOGS CLEARLY. <br/>
                    SEARCH AND DEBUG FASTER.
                </strong>
                <Button bgColor={'white'} borderColor={'#8E7FF0'} textColor={'#8E7FF0'}>
                    <div className={'flex flex-row gap-5'}>
                        <p>Get Started</p>
                        <Image
                            src={'images/Vector 2.svg'}
                            alt={'vector'}
                            width={'30'}
                            height={'30'}
                        ></Image>
                    </div>
                </Button>
            </section>
        </>
    )
}

export default Greeting;