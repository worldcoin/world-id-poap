import { Fragment, ReactNode } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import Close from '@/components/icons/Close'

interface ModalInterface {
    open: boolean
    onClose: () => void
    children: ReactNode
}

const Modal = (props: ModalInterface) => {

    const {
        open,
        onClose,
        children,
    } = props

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center text-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                as="div"
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 w-full max-w-md"
                            >
                                <div className="p-3">
                                    <button className="p-1.5" onClick={onClose}>
                                        <Close/>
                                    </button>
                                </div>
                                <div className="px-4 sm:px-6 md:px-12">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
