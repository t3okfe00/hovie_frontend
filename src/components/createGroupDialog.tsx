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

export function CreateGroupDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create New Group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Movie Group</DialogTitle>
                    <DialogDescription>
                        Create a new group to discuss and review movies with other enthusiasts.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Group Name</Label>
                        <Input id="name" placeholder="Enter group name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
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
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create Group</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}