import { useState } from 'react'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import Container from '@/components/Container'
import Paper from '@/components/Paper'
import Button from '@/components/Button'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import Check from '@/components/icons/Check'
import Help from '@/components/icons/Help'

export default function Create() {
    const [virtualDropEnabled, setVirtualDropEnabled] = useState(false)
    const [multiDayDropEnabled, setMultiDayDropEnabled] = useState(false)
    const [privateDropEnabled, setPrivateDropEnabled] = useState(false)

    return (
        <Page>
            <PageHeader>
                <Container className="mt-8">
                    <h1 className="text-h1 text-primary">
                        Create human-only POAP
                    </h1>
                    <p className="mt-3 text-lg text-neutral">
                        Worldcoin x Magic POAP Dispenser
                    </p>
                </Container>
            </PageHeader>
            <main className="mt-8 grow">
                <Container>
                    <Paper className="p-12">
                        <div className="grid grid-flow-col">
                            <h2 className="max-w-[500px] text-h2 text-primary">
                                #0032 - Proof of Personhood - Worldcoin
                            </h2>
                            <Button
                                className="h-11 px-6 justify-self-end text-primary border-primary"
                                variant="outlined"
                                size="sm"
                            >
                                Request more codes
                            </Button>
                        </div>
                        <hr className="my-12 border-neutral-border"/>
                        <label className="block">
                            <span className="block mb-1.5 text-md text-primary leading-5">
                                What are you commemorating?
                            </span>
                            <input
                                className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                            />
                        </label>
                        <label className="block mt-12">
                            <span className="block mb-1.5 text-md text-primary leading-5">
                                What do you want people to remember about this drop?
                            </span>
                            <textarea
                                className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                rows={7}
                            />
                        </label>

                        <section className="mt-12">
                            <Switch
                                className="inline-flex items-center gap-x-2"
                                checked={virtualDropEnabled}
                                onChange={setVirtualDropEnabled}
                            >
                                <span
                                    className={clsx(
                                        'block w-4 h-4 rounded-full',
                                        { 'border border-primary': !virtualDropEnabled },
                                        { 'bg-primary': virtualDropEnabled },
                                    )}
                                >
                                    {virtualDropEnabled && (
                                        <Check className="w-4 h-4 text-white"/>
                                    )}
                                </span>
                                    <span className="text-md text-primary leading-1px">
                                    Virtual drop
                                </span>
                            </Switch>
                            <div className="mt-4 grid grid-cols-2 gap-x-6">
                                <label className="block">
                                    <span className="grid grid-flow-col items-center mb-1.5 text-md text-primary leading-5">
                                        City
                                        <span className="justify-self-end text-xs text-neutral/30">Optional*</span>
                                    </span>
                                    <input
                                        className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                    />
                                </label>
                                <label className="block">
                                    <span className="grid grid-flow-col items-center mb-1.5 text-md text-primary leading-5">
                                        Country
                                        <span className="justify-self-end text-xs text-neutral/30">Optional*</span>
                                    </span>
                                    <input
                                        className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                    />
                                </label>
                            </div>
                        </section>

                        <section className="mt-12">
                            <Switch
                                className="inline-flex items-center gap-x-2"
                                checked={multiDayDropEnabled}
                                onChange={setMultiDayDropEnabled}
                            >
                                <span
                                    className={clsx(
                                        'block w-4 h-4 rounded-full',
                                        { 'border border-primary': !multiDayDropEnabled },
                                        { 'bg-primary': multiDayDropEnabled },
                                    )}
                                >
                                    {multiDayDropEnabled && (
                                        <Check className="w-4 h-4 text-white"/>
                                    )}
                                </span>
                                <span className="text-md text-primary leading-1px">
                                    Virtual drop
                                </span>
                            </Switch>
                            <div className="mt-4 grid grid-cols-3 gap-x-6">
                                <label className="block">
                                    <span className="mb-1.5 text-md text-primary leading-5">
                                        Start Date
                                    </span>
                                    <input
                                        className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 text-md text-primary leading-5">
                                        End Date
                                    </span>
                                    <input
                                        className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 text-md text-primary leading-5">
                                        Expiry Date
                                    </span>
                                    <input
                                        className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                    />
                                </label>
                            </div>
                        </section>

                        <hr className="mt-12 border-neutral-border"/>

                        <section className="mt-12">
                            <div className="grid grid-cols-2 gap-x-6">
                                <label className="block">
                                    <span className="mb-1.5 text-md text-primary leading-5">
                                        Start Date
                                    </span>
                                    <span className="block border bg-poap-blue/10 p-1 rounded-lg">
                                        <input
                                            type="file"
                                            accept="text/plain"
                                            onChange={() => {}}
                                            disabled={false}
                                            className="w-full text-sm text-black/50 file:h-10 file:mr-3 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:bg-poap-blue file:text-white hover:file:cursor-pointer focus:outline-none focus-visible:ring"
                                        />
                                    </span>
                                    <span className="flex items-center gap-x-2 mt-2 text-xs text-neutral-light">
                                        Select a .txt file that contains your POAP mint links!
                                        <button className="">
                                            <Help className="w-4 h-4 text-primary"/>
                                        </button>
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="flex items-center gap-x-2 mb-1.5 text-md text-primary leading-5">
                                        Edit Code
                                        <button className="">
                                            <Help className="w-4 h-4 text-primary"/>
                                        </button>
                                    </span>
                                    <input
                                        className="block h-12 w-full px-3 border border-poap-gray-light rounded-lg"
                                    />
                                </label>
                            </div>
                        </section>

                        <section className="mt-12">
                            <p className="text-md text-primary">
                                Image requirements:
                            </p>
                            <ul className="mt-1.5 list-disc list-inside text-xs text-neutral leading-4">
                                <li>Mandatory: PNG or GIF format</li>
                                <li>Recommended: measures 500x500px, round shape, size less than 200KB (Max. 4MB)</li>
                            </ul>
                        </section>

                        <section className="mt-12">
                            <Switch
                                className="inline-flex items-center gap-x-2"
                                checked={privateDropEnabled}
                                onChange={setPrivateDropEnabled}
                            >
                                <span
                                    className={clsx(
                                        'block w-4 h-4 rounded-full',
                                        { 'border border-primary': !privateDropEnabled },
                                        { 'bg-primary': privateDropEnabled },
                                    )}
                                >
                                    {privateDropEnabled && (
                                        <Check className="w-4 h-4 text-white"/>
                                    )}
                                </span>
                                <span className="text-md text-primary leading-1px">
                                    Private drop*
                                </span>
                            </Switch>
                            <img
                                className="mt-12 mx-auto w-[192px] h-[192px] bg-neutral-light rounded-full"
                                src=""
                                alt=""
                            />
                        </section>

                        <Button
                            className="h-14 mt-12 text-lg text-white bg-primary rounded-2"
                            variant="contained"
                            fullWidth
                        >
                            Save
                        </Button>
                    </Paper>
                </Container>
            </main>
            <PageFooter/>
        </Page>
    )
}
