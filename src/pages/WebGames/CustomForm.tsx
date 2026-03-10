'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { FileField, TextField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import CustomSwitch from 'components/SwitchIsDreft';


import { createSchemaWithPhotos } from './schema';
import { WebGamesResponse } from 'modules/web-games/types';
import useFileUploader from 'hooks/useFileUploader';
import { useCreateGames } from 'modules/web-games/hooks/useCreateGames';
import { useEditGames } from 'modules/web-games/hooks/useEditGames';


interface IProps {
    games?: WebGamesResponse;
    setSheetOpen: (state: boolean) => void;
}

export default function CustomForm({ games, setSheetOpen }: IProps) {
    const { uploadFile } = useFileUploader();

    console.log(uploadFile, "upload");


    const isEdit = !!games;


    const [isUploading, setIsUploading] = useState(false);

    // Dynamic schema
    const schema = createSchemaWithPhotos(1);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: games?.name || '',
            description: games?.description || '',
            link: games?.link || '',
            logo: games?.logo || '',
            isActive: games?.isActive || false,
        },
    });



    const { triggerGamesCreate, isPending: isCreatePending } = useCreateGames({
        setSheetOpen,
    });

    const { triggerEdit, isPending: isEditPending } = useEditGames({
        id: games?.id,
        setSheetOpen,
    });





    const onSubmit = async (data: any) => {
        try {
            setIsUploading(true);

            let logoFile: File | null = null;

            if (data.logo instanceof FileList) {
                logoFile = data.logo[0];
            }
            else if (data.logo instanceof File) {
                logoFile = data.logo;
            }
            else if (data.logo?.file instanceof File) {
                logoFile = data.logo.file;
            }

            if (logoFile) {
                const uploadedLogo = await uploadFile({ logo: logoFile }, 'logo');
                data.logo = uploadedLogo.logo;
            }

            if (isEdit) {
                await triggerEdit(data);
            } else {
                await triggerGamesCreate(data);
            }

        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <TextField name="name" label="O'yin nomi" required />
                <TextField name="description" label="O'yin tavsifi" required />
                <TextField name="link" label="O'yin linki" required />
                <Controller
                    name="isActive"
                    control={form.control}
                    render={({ field }) => (
                        <div className="flex items-center gap-2">
                            <CustomSwitch state={field.value} setState={field.onChange} />
                            {/* <label>Faol</label> */}
                        </div>
                    )}
                />
                <FileField name="logo" label="O'yin logotipi" />




                <LoadingButton isLoading={isCreatePending || isEditPending || isUploading}>
                    {isEdit ? "Tahrirlash" : "Saqlash"}
                </LoadingButton>
            </form>
        </Form>
    );
}