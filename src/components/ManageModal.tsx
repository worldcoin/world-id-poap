import Modal from '@/components/Modal'
import WorldcoinLogo from '@/components/icons/WorldcoinLogo'
import Button from '@/components/Button'

interface ManageModalInterface {
    open: boolean
    onClose: () => void
}

const ManageModal = (props: ManageModalInterface) => {
    const { open, onClose } = props

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center w-24 h-24 rounded-full text-poap-blue bg-poap-blue/10">
                    <WorldcoinLogo className="h-8"/>
                </div>
                <h2 className="mt-6 text-h2 leading-[1.375]">
                    Manage Your Dispenser
                </h2>
                <p className="mt-1 text-md text-poap-blue">
                    Worldcoin x Magic POAP Dispenser
                </p>
                <hr className="my-4 border-poap-gray-light"/>
                <label>
                    <span className="block mb-2 text-sm leading-4">
                        Enter your edit phrase
                    </span>
                    <input
                        className="block h-12 w-full text-center border border-poap-gray-light rounded-lg"
                        autoFocus
                    />
                    <span className="block mt-2 text-xs text-poap-blue leading-5">
                        Forgot your phrase?
                    </span>
                </label>
                <hr className="my-4 border-poap-gray-light"/>
                <Button
                    className="mt-2 mb-12 text-poap-blue border-poap-blue"
                    variant="outlined"
                    size="lg"
                    fullWidth
                >
                    Manage Dispenser
                </Button>
            </div>
        </Modal>
    )
}

export default ManageModal
