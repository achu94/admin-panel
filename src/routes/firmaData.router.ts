// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/firmaData.service";
import {Firma} from "../models/Firma";
import type { WithId, Document } from "mongodb";

// Interface...

interface FirmaArray extends WithId<Document> {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
  telefon: number;
  eMail: string;
  umsatzsteuerId: number;
  id?: ObjectId;
}

// Router Definition

export const firmaDataRouter = express.Router();

// GET

firmaDataRouter.get("/", async (_req: Request, res: Response) => {
  if (!collections.FirmaDaten) return;

  try {
    const firma = (await collections.FirmaDaten.find({}).toArray()) as FirmaArray[];

    res.status(200).send(firma);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

firmaDataRouter.get("/:id", async( req: Request, res: Response) => {
    if (!collections.FirmaDaten) return;

    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id)};
        const firma = (await collections.FirmaDaten.findOne(query)) as FirmaArray;

        if(firma){
            res.status(200).send(firma);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// POST
    firmaDataRouter.post("/", async (req: Request, res: Response) => {
        if (!collections.FirmaDaten) return;

        try {

            const newFirma = req.body as Firma;
            const result = await collections.FirmaDaten.insertOne(newFirma);

            result
                ? res.status(201).send(`Successfully created a new firma with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new firma.");
        } catch (error: any) {
            console.error(error);
            res.status(400).send(error.message);
        }
    });
// PUT

    firmaDataRouter.put("/:id", async (req: Request, res: Response) => {
        if (!collections.FirmaDaten) return;

        const id = req?.params?.id;

        try {
            const updatedFirma: Firma = req.body as Firma;
            const query = { _id: new ObjectId(id) };

            const result = await collections.FirmaDaten.updateOne(query, { $set: updatedFirma });

            result
                ? res.status(200).send(`Successfully updated game with id ${id}`)
                : res.status(304).send(`Game with id: ${id} not updated`);
        } catch (error: any) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    });

// DELETE

    firmaDataRouter.delete("/:id", async (req: Request, res: Response) => {
        if (!collections.FirmaDaten) return;
        
        const id = req?.params?.id;

        try {
            const query = { _id: new ObjectId(id) };
            const result = await collections.FirmaDaten.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed firma with id ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove firma with id ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Firma with id ${id} does not exist`);
            }
        } catch (error: any) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    });
