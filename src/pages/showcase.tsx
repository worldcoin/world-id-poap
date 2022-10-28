import { Fragment, useState } from 'react'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import Container from '@/components/Container'
import Paper from '@/components/Paper'
import Search from '@/components/icons/Search'
import { Listbox, Transition } from '@headlessui/react'
import Button from '@/components/Button'
import External from '@/components/icons/External'
import Upload from '@/components/icons/Upload'
import ChevronDown from '@/components/icons/ChevronDown'
import ReactPaginate from 'react-paginate'

export default function Showcase() {
    const [pageSize, setPageSize] = useState(10)
    return (
        <Page>
            <PageHeader>
                <Container className="mt-8">
                    <h1 className="text-h1 text-primary">
                        POAP showcase
                    </h1>
                    <p className="mt-3 text-lg text-neutral">
                        Worldcoin x Magic POAP Dispenser
                    </p>
                </Container>
            </PageHeader>
            <main className="mt-8 grow">
                <Container>
                    <Paper className="px-8 pt-6 pb-8">
                        <h3 className="mb-6 text-lg text-neutral leading-6">
                            Human-only POAP drops
                        </h3>
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="absolute top-0 left-0 h-full flex items-center">
                                    <Search className="ml-3.5 mr-3 text-neutral-icon"/>
                                </div>
                                <input
                                    className="block h-12 w-96 pl-12 pr-4 border border-neutral-border rounded-2 text-sm placeholder-neutral-light"
                                    placeholder="Search Human-only POAP by name..."
                                />
                            </div>
                            <div className="grow flex items-center gap-x-2 ml-8 mr-2 text-sm text-neutral-light">
                                Results per page:
                                <Listbox value={pageSize} onChange={setPageSize}>
                                    <div className="relative">
                                        <Listbox.Button className="relative flex items-center h-12 px-5 text-primary border border-neutral-border rounded-2">
                                            <span className="block truncate">{pageSize}</span>
                                            <ChevronDown className="w-4 h-4 ml-2"/>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto text-sm border border-neutral-border rounded-2 bg-white py-1 shadow-paper">
                                                {[10, 25, 50, 100].map((value) => (
                                                    <Listbox.Option
                                                        key={value}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 px-5 ${
                                                                active ? 'bg-primary/20 text-primary' : 'text-neutral'
                                                            }`
                                                        }
                                                        value={value}
                                                    >
                                                        {value}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <Button
                                className="text-primary border-primary"
                                variant="outlined"
                                size="lg"
                            >
                                Create new POAP
                            </Button>
                        </div>
                        <table
                            className="w-full mt-4 border-separate border-spacing-0 border border-poap-gray-light rounded-2"
                        >
                            <thead className="text-sm text-neutral-light leading-4.5 whitespace-nowrap">
                                <tr>
                                    <td className="py-3 pl-12 pr-8 border-b border-poap-gray-light">
                                        #
                                    </td>
                                    <td className="py-3 pl-8 pr-8 border-b border-poap-gray-light">
                                        Name of the POAP
                                    </td>
                                    <td className="py-3 pl-8 pr-8 border-b border-poap-gray-light">
                                        Start date
                                    </td>
                                    <td className="py-3 pl-8 pr-8 border-b border-poap-gray-light">
                                        Image
                                    </td>
                                    <td className="py-3 pl-8 pr-8 border-b border-poap-gray-light">

                                    </td>
                                </tr>
                            </thead>
                            <tbody className="text-md text-neutral leading-4.5 whitespace-nowrap">
                                <tr>
                                    <td className="py-1 pl-12 pr-8">
                                        1
                                    </td>
                                    <td className="py-1 pl-8 pr-8 w-full">
                                        <a
                                            className="text-primary"
                                            href=""
                                        >
                                            Proof of Personhood
                                        </a>
                                    </td>
                                    <td className="py-1 pl-8 pr-8">
                                        19 Jul, 2022
                                    </td>
                                    <td className="py-1 pl-8 pr-8">
                                        <img className="w-11 h-11 rounded-full bg-neutral-light" src="" alt="" />
                                    </td>
                                    <td className="pr-6">
                                        <div className="flex items-center gap-x-6">
                                            <Button
                                                className="px-3 text-primary"
                                                variant="outlined"
                                                size="sm"
                                            >
                                                Claim <External className="w-4 h-4 ml-1"/>
                                            </Button>
                                            <Button
                                                className="w-8 h-8 text-primary"
                                            >
                                                <Upload className="w-6 h-6"/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                    <ReactPaginate
                        className="mt-8 flex justify-center text-sm text-primary"
                        pageLinkClassName="flex items-center justify-center w-14 h-14"
                        activeLinkClassName="bg-white border border-neutral-border rounded-2"
                        previousLinkClassName="flex items-center justify-center h-14 mr-12 text-lg"
                        nextLinkClassName="flex items-center justify-center h-14 ml-12 text-lg"
                        breakLinkClassName="flex items-center justify-center w-14 h-14"
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={() => {}}
                        pageRangeDisplayed={5}
                        pageCount={100}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                    />
                </Container>
            </main>
            <PageFooter />
        </Page>
    )
}
