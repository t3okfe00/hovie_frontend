import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImagePlus, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from "@/hooks/useAuth";

const BASE_URL = "http://localhost:3000/groups";

export function CreateGroupDialog() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const createGroupMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(`${BASE_URL}`, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Failed to create group");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["yourGroups"] });
            setIsOpen(false);
            setName("");
            setDescription("");
            setCategory("");
            setImagePreview(null);
            setImage(null);
            setError(null);
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImage(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description || !category || !image) {
            setError("All fields are required.");
            return;
        }
        const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('ownersId', user?.id.toString());
        formData.append('category', capitalizedCategory);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        createGroupMutation.mutate(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Create New Group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Movie Group</DialogTitle>
                    <DialogDescription>
                        Create a new group to discuss and review movies with other enthusiasts.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid gap-2">
                        <Label>Group Picture</Label>
                        <div className="relative">
                            {imagePreview ? (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                    <img
                                        src={imagePreview}
                                        alt="Group preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={removeImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Click to upload group picture
                                        </p>
                                    </div>
                                    <Input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Group Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter group name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="horror">Horror</SelectItem>
                                <SelectItem value="action">Action</SelectItem>
                                <SelectItem value="comedy">Comedy</SelectItem>
                                <SelectItem value="drama">Drama</SelectItem>
                                <SelectItem value="scifi">Sci-Fi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your group..."
                            className="resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Group</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}