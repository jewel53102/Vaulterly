"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type FollowButtonProps = {
  targetUserId: string;
};

export default function FollowButton({ targetUserId }: FollowButtonProps) {
  const supabase = createClient();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadFollowState() {
      setIsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCurrentUserId(null);
        setIsLoading(false);
        return;
      }

      setCurrentUserId(user.id);

      if (user.id === targetUserId) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("follows")
        .select("follower_id, following_id")
        .eq("follower_id", user.id)
        .eq("following_id", targetUserId)
        .maybeSingle();

      setIsFollowing(Boolean(data));
      setIsLoading(false);
    }

    loadFollowState();
  }, [supabase, targetUserId]);

  async function toggleFollow() {
    if (!currentUserId) {
      window.location.href = "/login";
      return;
    }

    if (currentUserId === targetUserId) return;

    setIsSaving(true);

    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", currentUserId)
        .eq("following_id", targetUserId);

      if (!error) {
        setIsFollowing(false);
      }

      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("follows").insert({
      follower_id: currentUserId,
      following_id: targetUserId,
    });

    if (!error) {
      setIsFollowing(true);
    }

    setIsSaving(false);
  }

  if (isLoading || currentUserId === targetUserId) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleFollow}
      disabled={isSaving}
      className={isFollowing ? "button button-secondary" : "button button-primary"}
    >
      {isSaving ? "Saving..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}