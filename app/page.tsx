"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { RocketIcon, MessageCircleIcon, ExternalLinkIcon } from "lucide-react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/assistant",
  });

  const [showFullChat, setShowFullChat] = useState(false);

  console.log(messages);

  const lastUserMessage = messages.filter((m) => m.role === "user").pop();
  const lastAIMessage = messages.filter((m) => m.role === "assistant").pop();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Create Your Course with AI
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Use our AI-powered tool to create engaging and effective courses in
            minutes.
          </p>
        </section>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <RocketIcon className="mr-2" />
              AI Course Creator Assistant
            </CardTitle>
            <CardDescription>
              I&apos;m here to help you create amazing courses. Ask me anything!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {showFullChat ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.role === "user" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <strong>
                      {message.role === "user" ? "You: " : "AI: "}
                    </strong>
                    {message.content}
                  </div>
                ))
              ) : (
                <>
                  {lastUserMessage && (
                    <div className="p-4 rounded-lg bg-blue-100">
                      <strong>You: </strong>
                      {lastUserMessage.content}
                    </div>
                  )}
                  {lastAIMessage && (
                    <div className="p-4 rounded-lg bg-gray-100">
                      <strong>AI: </strong>
                      {lastAIMessage.content}
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              <Input
                placeholder="Ask about creating your course..."
                value={input}
                onChange={handleInputChange}
              />
              <div className="flex justify-between">
                <Button type="submit" className="w-32">
                  <MessageCircleIcon className="mr-2 h-4 w-4" /> Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFullChat(!showFullChat)}
                >
                  {showFullChat ? "Show Less" : "Show Full Chat"}
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>

        <section className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Describe Your Course
              </h4>
              <p className="text-gray-600">
                Tell our AI what you want to teach and who your audience is.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                AI Generates Content
              </h4>
              <p className="text-gray-600">
                Our AI creates a course outline and content based on your input.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Refine and Publish</h4>
              <p className="text-gray-600">
                Review, edit, and publish your AI-generated course.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-100"
            onClick={() =>
              window.open(
                "https://www.postman.com/your-api-docs-link",
                "_blank"
              )
            }
          >
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            Postman API Documentation
          </Button>
        </section>

        <section className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Ready Endpoints
          </h3>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Endpoint:</strong> /api/create-course
                </p>
                <p>
                  <strong>Method:</strong> POST
                </p>
                <p>
                  <strong>Description:</strong> This endpoint allows you to
                  create a new course by providing course details such as title,
                  description, and target audience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Generate Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Endpoint:</strong> /api/generate-lesson
                </p>
                <p>
                  <strong>Method:</strong> POST
                </p>
                <p>
                  <strong>Description:</strong> Use this endpoint to generate a
                  new lesson for an existing course. Provide the course ID and
                  lesson topic to receive AI-generated lesson content.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Endpoint:</strong> /api/create-quiz
                </p>
                <p>
                  <strong>Method:</strong> POST
                </p>
                <p>
                  <strong>Description:</strong> This endpoint helps you create a
                  quiz for a specific lesson. Provide the lesson ID and desired
                  number of questions to generate a quiz with multiple-choice
                  questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            &copy; 2025 Course Creator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
