import { FC, useState } from 'react'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Image from 'next/image'
import CreateModal from '@/components/CreateModal'
import ManageModal from '@/components/ManageModal'

const Home: FC = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
    const [manageModalOpen, setManageModalOpen] = useState<boolean>(false)

    return (
        <Page>
            <PageHeader>
                <Container className="mt-16">
                    <h1 className="text-h1 text-poap-purple">
                        Human-only POAP dispenser
                    </h1>
                    <p className="mt-3 text-h2 text-poap-pink">
                        Worldcoin meets Magic POAP Dispenser
                    </p>
                    <p className="mt-6 text-lg text-poap-gray">
                        Distribute POAPs ensuring a single person can only claim once.
                    </p>
                    <div className="mt-8 flex items-center space-x-4">
                        <Button
                            className="border-poap-purple text-poap-purple"
                            variant="outlined"
                            size="lg"
                            onClick={() => setCreateModalOpen(true)}
                        >
                            Create Dispenser
                        </Button>
                        <Button
                            className="px-6 text-poap-gray"
                            size="lg"
                            onClick={() => setManageModalOpen(true)}
                        >
                            Manage Dispenser
                        </Button>
                    </div>
                </Container>
            </PageHeader>
            <Container>
                <section className="mt-32 py-9 grid grid-cols-2 gap-x-6">
                    <div className="grid items-center justify-center">
                        <div className="relative">
                            <Image
                                src="/images/lesson1.svg"
                                alt="Ethereum"
                                width={420}
                                height={248}
                            />
                            <div className="absolute top-0 right-0 w-[441px]">
                                <Image
                                    src="/images/lesson1-overlay.svg"
                                    alt=""
                                    width={441}
                                    height={331}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid items-center justify-center">
                        <h2 className="self-end mb-8 text-h2 text-poap-pink">
                            Users
                        </h2>
                        <ol className="self-start list-decimal list-inside marker:text-poap-gray/30 grid grid-flow-row gap-y-4 text-lg text-poap-gray">
                            <li>User taps or scans your QR code</li>
                            <li>User verifies with World ID</li>
                            <li>User gets the POAP 🎉</li>
                        </ol>
                    </div>
                </section>
                <section className="mt-32 py-9 grid grid-cols-2 gap-x-6">
                    <div className="grid items-center justify-center">
                        <h2 className="self-end mb-8 text-h2 text-poap-pink">
                            Distributors
                        </h2>
                        <ol className="self-start list-decimal list-inside marker:text-poap-gray/30 grid grid-flow-row gap-y-4 text-lg text-poap-gray">
                            <li>You upload your .txt file from PAOP</li>
                            <li>You get a link and QR code you can share repeatedly</li>
                            <li>A single person can only claim your POAP once 🥳</li>
                        </ol>
                    </div>
                    <div className="grid items-center justify-center">
                        <Image
                            src="/images/lesson2.svg"
                            alt="Bitcoin"
                            width={420}
                            height={248}
                        />
                    </div>
                </section>
                <section className="mt-32 grid grid-flow-row gap-y-12 justify-center">
                    <h2 className="font-light text-h2 text-poap-pink text-center">
                        Start distributing<br/>human-only POAPs
                    </h2>
                    <Button
                        className="border-poap-purple text-poap-purple"
                        variant="outlined"
                        size="lg"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        Create Dispenser
                    </Button>
                </section>
            </Container>
            <PageFooter />
            <CreateModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
            <ManageModal open={manageModalOpen} onClose={() => setManageModalOpen(false)} />
        </Page>
    )
}

export default Home
