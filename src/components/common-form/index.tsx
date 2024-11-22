import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormControl {
    componentType: string;
    disabled?: boolean;
    placeholder?: string;
    name: string;
    label?: string;
}

export default function CommonForm({ action,  buttonText, isBtndisabled, formControls, btnType, formData, setFormData, handleFileChange }: { action: () => Promise<void>, buttonText: string, isBtndisabled: boolean, formControls: FormControl[], btnType?: "button" | "reset" | "submit", formData: any,  setFormData: (data: any) => void, handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {

    function renderInputByComponentType(getCurrentControl: any) {
        let content = null;

        switch (getCurrentControl.componentType) {
            case 'input':
                content = (<div className="relative flex items-center mt-8">
                    <Input
                        type="text"
                        disabled={getCurrentControl.disabled}
                        placeholder={getCurrentControl.placeholder}
                        name={getCurrentControl.name}
                        id={getCurrentControl.name}
                        value={formData[getCurrentControl.name]}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transtion-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>)
                break;

            case "file":
                content = (<Label
                    htmlFor={getCurrentControl.name}
                    className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
                >
                    <h2>{getCurrentControl.label}</h2>
                    <Input onChange={handleFileChange} id={getCurrentControl.name} type="file" />
                </Label>)
                break;

            default:
                content = (<div className="relative flex items-center mt-8">
                    <Input
                        type="text"
                        disabled={getCurrentControl.disabled}
                        placeholder={getCurrentControl.placeholder}
                        name={getCurrentControl.name}
                        id={getCurrentControl.name}
                        value={formData[getCurrentControl.name]}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transtion-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>)
                break;
        }
        return content;
    }


    return (
        <form action={action}>
            {
                formControls.map((control: any) => renderInputByComponentType(control))
            }
            <div>
                <Button
                    type={btnType || "submit"}
                    className="disabled:opactiy-60 flex h-11 items-center justify-center px-5 mt-8"
                    disabled={isBtndisabled} 
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    )
}