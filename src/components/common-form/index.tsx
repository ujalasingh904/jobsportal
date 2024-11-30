import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export default function CommonForm({ action,  buttonText, isBtndisabled, formControls, btnType, formData, setFormData, handleFileChange } :any) {

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
                        className="w-full dark:text-black rounded-md h-[60px] px-4 border bg-gray-300 text-lg outline-none drop-shadow-sm transtion-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>)
                break;

            case "file":
                content = (<Label
                    htmlFor={getCurrentControl.name}
                    className="flex bg-gray-100 dark:text-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
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
                        className="w-full dark:text-black rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transtion-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>)
                break;
        }
        return content;
    }


    return (
        <form action={action}>
            {
                formControls.map((control:any, index:any) => (
                    <div key={index}>
                        {renderInputByComponentType(control)}
                    </div>
                ))
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