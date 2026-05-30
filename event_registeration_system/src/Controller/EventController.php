<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use App\Repository\EventRepository;

final class EventController extends AbstractController
{
    #[Route('/events', name: 'event_list')]
    public function getEvents(EventRepository $eventRepository): JsonResponse
    {
        $events = $eventRepository->findAll();
        $data = [];

        foreach($events as $event){
            $data[] = [
                'id' => $event->getId(),
                'title' => $event->getTitle(),
                'description' => $event->getDescription(),
                'location' => $event->getLocation(),
                'eventDate' => $event->getEventDate()->format('Y-m-d H:i:s'),
                'maxSeats' => $event->getMaxSeats(),
                'status' => $event->getStatus()
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('/events/new',name: 'add_event', methods: ['POST'])]
    public function addEvent(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $event = new Event();

        $event->setTitle($data['title']);
        $event->setDescription($data['description']);
        $event->setLocation($data['location']);
        $event->setEventDate(new \DateTime($data['eventDate']));
        $event->setMaxSeats($data['maxSeats']);
        $event->setStatus($data['status']);

        $entityManager->persist($event);
        $entityManager->flush();

        return new JsonResponse(["message" => "Event added successfully"]);
    }

    #[Route('/events/{id}', name: 'get_event', methods: ['GET'])]
    public function getEventById(EventRepository $eventRepository, int $id): JsonResponse{
        
        $event = $eventRepository->find($id);

        if(!$event){
            return new JsonResponse([
                "message" => "Event not found"
            ],404);
        }

        return new JsonResponse([
            'id' => $event->getId(),
            'title' => $event->getTitle(),
            'description' => $event->getDescription(),
            'location' => $event->getLocation(),
            'eventDate' => $event->getEventDate()->format('Y-m-d H:i:s'),
            'maxSeats' => $event->getMaxSeats(),
            'status' => $event->getStatus()
        ]);

    }

    #[Route('/events/{id}',name: 'update_event', methods: ['PUT'])]
    public function updateEvent(Request $request, EntityManagerInterface $entityManager, EventRepository $eventRepository, int $id): JsonResponse
    {
        $event = $eventRepository->find($id);

        if(!$event){
            return new JsonResponse([
                "message" => 'Event not found'
            ],404);
        }

        $data = json_decode($request ->getContent(),true);

        $event->setTitle($data['title']);
        $event->setDescription($data['description']);
        $event->setLocation($data['location']);
        $event->setEventDate(new \DateTime($data['eventDate']));
        $event->setMaxSeats($data['maxSeats']);
        $event->setStatus($data['status']);

        $entityManager->flush();

        return new JsonResponse(["message" => "Event updated successfully"]);

    }

    #[Route('events/{id}/status',name: 'update_event_status', methods: ['PATCH'])]
    public function updateStatus(int $id,Request $request,EventRepository $eventRepository, EntityManagerInterface $entityManager)
    {
        $event = $eventRepository->find($id);

        if(!$event){
            return new JsonResponse([
                "message"=>"Event not found"
            ],404);
        }
        $data = json_decode($request->getContent(),true);

        if(!isset($data['status'])){
            return new JsonResponse([
                "message" => "Status field is required"
            ],400);
        }

        $event->setStatus($data['status']);
        $entityManager->flush();

        return new JsonResponse([
            "message" => "Event status updated successfully"
        ]);
    }

    #[Route('/events/{id}',name: 'delete_event', methods: ['DELETE'])]
    public function deleteEvent(int $id, EventRepository $eventRepository, EntityManagerInterface $entityManager):JsonResponse{
        $event = $eventRepository->find($id);

        if(!$event){
            return new JsonResposne(["message"=>"Event not found"],404);
        }

        $entityManager->remove($event);
        $entityManager->flush();

        return new JsonResponse(["message" => "Event deleted successfully"]);
    }
    
}
